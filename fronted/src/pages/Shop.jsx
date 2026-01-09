import React from "react";
import CategoryMenu from "../components/CategoryMenu";
import FoodItems from "../components/FoodItems";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const Shop = () => {
  return (
      <div className="min-h-screen">
      <Navbar/>
     
      <section 
        className="relative min-h-[60vh] flex flex-col items-center justify-center px-4"
        style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
      >
        <div className="text-center text-white max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Discover Culinary Excellence
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-2xl mx-auto">
            Premium quality dishes crafted with passion, served with perfection
          </p>
        </div>
      </section>

     
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
        <div className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Browse By <span className="text-green-600">Categories</span>
          </h2>
          <CategoryMenu />
        </div>

        <div>
        
          <FoodItems />
        </div>
          </main>
          <Footer/>
    </div>
  );
};

export default Shop;