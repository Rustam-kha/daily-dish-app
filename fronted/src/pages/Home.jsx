import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import FoodItems from "../components/FoodItems";
import { motion, AnimatePresence } from "framer-motion";
import {  ChevronLeft, ChevronRight } from "lucide-react";
import { MdLocalOffer, MdRestaurantMenu, MdDeliveryDining } from "react-icons/md";
import Footer from "../components/Footer";

const Home = () => {
  const navigate = useNavigate();

  const [activeSlide, setActiveSlide] = useState(0);
  const [activeOffer, setActiveOffer] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const slides = [
    {
      image:
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=2070&q=80",
      title: "Premium Dining Experience",
      subtitle: "Fresh ingredients, authentic flavors delivered to your door",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=2070&q=80",
      title: "Fast & Reliable Delivery",
      subtitle: "Hot meals delivered in 30 minutes or less",
      buttonText: "Shop Now",
    },
    {
      image:
        "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2070&q=80",
      title: "Chef-Curated Menu",
      subtitle: "Daily specials crafted by culinary experts",
      buttonText: "Shop Now",
    },
  ];

  const offers = [
    { text: "🔥 25% OFF on First Order", color: "from-red-500 to-orange-500" },
    { text: "🚚 Free Delivery Above Rs. 500", color: "from-green-500 to-green-700" },
    { text: "🎁 Free Dessert on Orders > Rs. 1500", color: "from-purple-500 to-pink-500" },
  ];



  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) setActiveSlide((p) => (p + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAnimating, slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveOffer((p) => (p + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const slideVariants = {
    enter: { opacity: 0, x: 100 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

 
      <section className="relative h-[85vh] min-h-[600px] overflow-hidden">
     
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.7 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div
              className="absolute inset-0 bg-cover bg-center pointer-events-none"
              style={{ backgroundImage: `url(${slides[activeSlide].image})` }}
            >
              <div className="absolute inset-0 bg-black/60 pointer-events-none" />
            </div>
          </motion.div>
        </AnimatePresence>

      
        <button
          onClick={() =>
            setActiveSlide((p) => (p - 1 + slides.length) % slides.length)
          }
          className="absolute left-4 top-1/2 z-20 bg-black/40 text-white p-3 rounded-full cursor-pointer"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={() => setActiveSlide((p) => (p + 1) % slides.length)}
          className="absolute right-4 top-1/2 z-20 bg-black/40 text-white p-3 rounded-full cursor-pointer"
        >
          <ChevronRight />
        </button>

     
        <div className="relative z-30 flex items-center justify-center h-full text-white px-4">
          <div className="text-center max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">
              {slides[activeSlide].title}
            </h1>
            <p className="text-xl mb-8">{slides[activeSlide].subtitle}</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate("/shop")}
                className="px-8 py-3 bg-green-600 rounded-lg font-bold hover:bg-green-700 flex items-center gap-2"
              >
                <MdRestaurantMenu />
                {slides[activeSlide].buttonText}
              </button>

              <button
                onClick={() => navigate("/contact")}
                className="px-8 py-3 bg-white/20 border border-white rounded-lg font-bold hover:bg-white/30 flex items-center gap-2"
              >
                <MdDeliveryDining />
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>

   
      <motion.div
        onClick={() => navigate("/shop")}
        className={`cursor-pointer bg-gradient-to-r ${offers[activeOffer].color} py-3 text-white text-center font-bold`}
      >
        <MdLocalOffer className="inline mr-2" />
        {offers[activeOffer].text}
      </motion.div>

   
      <main className="max-w-7xl mx-auto px-4 py-12">
        <CategoryMenu />
        <FoodItems />
      </main>

      <Footer />

    
     
    </div>
  );
};

export default Home;
