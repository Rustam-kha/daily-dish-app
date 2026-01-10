import User from "../models/User.js";
import Food from "../models/Food.js";
import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();

const stripeInstance = new Stripe(process.env.STRIPE_KEY);



export const addToCart = async (req, res) => {
  const userId = req.params.id;
  const { id, name, price, rating, image, quantity } = req.body;

  try {
    let existingItem = await Food.findOne({ id, userId: userId });

    if (existingItem) {
      let updatedItem = await Food.findOneAndUpdate(
        { id, userId },
        {
          $set: {
            quantity: existingItem.quantity + 1,
            totalPrice: existingItem.price * (existingItem.quantity + 1),
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      if (!updatedItem) {
        return res
          .status(400)
          .json({ success: true, message: "Failed to add to cart" });
      }
      return res.status(200).json({ success: true, message: "Added to cart" });
    }
    let newFood = await Food.create({
      id,
      name,
      price,
      rating,
      image,
      quantity,
      userId,
      totalPrice: price * quantity,
    });
    const saveFood = await newFood.save();

    let user = await User.findOneAndUpdate(
      { _id: userId },
      {
        $push: {
          cartItems: saveFood._id,
        },
      }
    );
    return res.status(200).json({
      success: true,
      message: "Added to cart",
    });
    
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getCart = async (req, res) => {
  const userId = req.params.id;

  try {
    const cartItems = await Food.find({ userId });

    if (!cartItems) {
      return res.status(400).json({
        success: false,
        message: "No items found",
      });
    }

    return res.status(200).json({ success: true, cartItems });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    const food = await Food.findOneAndDelete({ _id: itemId });

    if (!food) {
      return res
        .status(400)
        .json({ success: false, message: "Food not found" });
    }

    await User.findByIdAndUpdate(
      userId,
      { $pull: { cartItems: itemId } }
    );

    return res.status(200).json({
      success: true,
      message: "Food removed from cart",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};



export const incrementQuantity = async (req, res)=>{
  const id = req.params.id;

  try {
     
    let food = await Food.findOneAndUpdate(
      { _id: id },
      [{
        $set: {
          quantity: { $add: ["$quantity", 1] },
          totalPrice: { $multiply: ["$price", { $add: ["$quantity", 1] }] }
        }
      }],
      {
        upsert: true,
        new: true
      }
    );

    if (!food) {
      return res.status(400).json({
        success: false,
        message:"Food not found"
      })
    }
    return res.status(200).json({success:true,message:"Food quantity increment",food})
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
}

export const decrementQuantity = async (req, res) => {
  const id = req.params.id;

  try {
    const food = await Food.findById(id);

    if (!food || food.quantity <= 1) {
      return res
        .status(400)
        .json({ success: false, message: "Cannot decrement quantity" });
    }

    food.quantity -= 1;
    food.totalPrice = food.price * food.quantity;

    await food.save();

    return res.status(200).json({
      success: true,
      message: "Food quantity decremented",
      food,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


export const checkout = async (req, res) => {
  const userId = req.id; 

  try {
    const cartItems = await Food.find({ userId });

    const session = await stripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "pkr",
          product_data: {
            name: item.name,
            images: [item.image],
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),
      // success_url: "http://localhost:5173/success",
      // cancel_url: "http://localhost:5173/cancel",
      success_url: "https://daily-dish-app.vercel.app/success",
      cancel_url: "https://daily-dish-app.vercel.app/cancel",

    });

    return res.json({ url: session.url });
  } catch (error) {  
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


export const clearCart = async (req, res) => {
  const userId = req.id;

  try {
    const deletedItems = await Food.deleteMany({ userId });
    const deletedList=await User.findOneAndUpdate({_id:userId},{cartItems:[]})
    
    if (!deletedItems) {
      return res.status(400).json({success:false,message:"Failed to clear cart."})
    }

    return res.status(200).json({success:true,message:"Order confirm"})

  } catch {
    return res.status(500).json({success:false,message:error.message})
  }
}
