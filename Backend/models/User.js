
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "food",
    },
  ],
  otp: {
    type: Number,
    default: 0,
  },
  otpExpiry: {
    type: Date,
  },

  contactMessages: [
    {
      subject: String,
      message: String,
      timestamp: {
        type: Date,
        default: Date.now
      },
      status: {
        type: String,
        enum: ['pending', 'responded', 'closed'],
        default: 'pending'
      }
    }
  ]
});

const User = mongoose.model("user", userSchema);
export default User;