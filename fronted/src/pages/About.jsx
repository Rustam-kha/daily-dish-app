import React from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Link} from "react-router-dom"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
const About = () => {

  const testimonials = [
    {
      quote: "DailyDish has transformed my daily meals. The variety and freshness are unmatched!",
      author: "Sarah L.",
      role: "Regular Customer",
      img: "https://images.unsplash.com/photo-1494790108755-2616b786d4d1?w=200&h=200&fit=crop&crop=face",
    },
    {
      quote: "From breakfast to dinner, I always know I'm getting quality meals delivered on time.",
      author: "Raj P.",
      role: "Subscriber",
      img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
    },
    {
      quote: "Healthy, tasty, and convenient! DailyDish never disappoints.",
      author: "Meera S.",
      role: "Working Professional",
      img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&crop=face",
    },
    {
      quote: "Amazing meals every day! The flavors are consistently fresh and delicious.",
      author: "John D.",
      role: "Family Plan User",
      img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
    },
  ];


  const services = [
    {
      title: "Breakfast",
      desc: "Freshly prepared breakfasts to energize your mornings with wholesome oats, smoothies, and classic favorites.",
      img: "https://images.unsplash.com/photo-1484723091739-30a097e8f929?w=600&h=400&fit=crop",
      icon: "🥐",
    },
    {
      title: "Lunch",
      desc: "Hearty, balanced, and flavorful lunches designed to keep your afternoons productive and satisfying.",
      img: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=400&fit=crop",
      icon: "🥗",
    },
    {
      title: "Dinner",
      desc: "Chef-curated dinners combining global inspiration with local favorites for memorable evening meals.",
      img: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&h=400&fit=crop",
      icon: "🍽️",
    },
    {
      title: "Snacks",
      desc: "Thoughtfully crafted bites, tea-time treats, and guilt-free indulgences for every craving.",
      img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=400&fit=crop",
      icon: "🍪",
    },
  ];

  
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: "easeOut" 
      } 
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { 
        duration: 0.6,
        ease: "easeOut" 
      } 
    },
  };

  
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    dotsClass: "slick-dots !bottom-[-40px]",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          arrows: false,
        },
      },
    ],
  };

  return (
    <>
      <Navbar/>
    <div className="font-sans text-gray-800 overflow-hidden">

      <section className="relative min-h-[90vh] flex items-center justify-center bg-cover bg-center">
        <div 
          className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-700/60"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=2070&q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <motion.div 
          className="relative container mx-auto px-4 sm:px-6 lg:px-8 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-4xl mx-auto bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Delighting Your Taste Buds, <span className="text-yellow-300">Every Day</span>
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              At <span className="font-bold text-yellow-300">DailyDish</span>, we craft fresh, wholesome, 
              and delicious meals—from sunrise breakfasts to evening dinners, plus everything in between.
            </motion.p>
            <motion.button
              className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
             <Link to="/shop">Explore Our Menu</Link>
            </motion.button>
          </div>
        </motion.div>
      </section>

    
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInLeft}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop"
                  alt="Our Story"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-green-600 text-white p-6 rounded-2xl shadow-xl">
                  <p className="text-2xl font-bold">Since 2026</p>
                  <p className="text-sm opacity-90">Serving Happiness</p>
                </div>
              </div>
            </motion.div>
            <motion.div 
              className="lg:w-1/2"
              variants={fadeInRight}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Story</span>
              </h2>
              <div className="space-y-4">
                <p className="text-gray-700 text-lg leading-relaxed">
                  DailyDish emerged from a simple yet powerful belief: 
                  <span className="font-semibold text-green-700"> great food should be accessible, nourishing, and joyful.</span> 
                  We saw a gap between convenience and quality, and decided to bridge it.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  What started as a small kitchen experiment is now a beloved service trusted by thousands of households. 
                  Our journey is built on one meal at a time, always prioritizing freshness, flavor, and care.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">10,000+</p>
                  <p className="text-gray-600">Happy Customers</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-green-700">50+</p>
                  <p className="text-gray-600">Expert Chefs</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Our <span className="text-green-600">Services</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                From morning fuel to evening comfort, we've got every part of your day covered
              </p>
            </div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
            >
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                  variants={fadeInUp}
                  whileHover={{ y: -8 }}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={service.img}
                      alt={service.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm w-12 h-12 rounded-full flex items-center justify-center text-2xl">
                      {service.icon}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{service.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

   
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer}
          >
            <motion.div 
              className="lg:w-1/2 order-2 lg:order-1"
              variants={fadeInLeft}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our <span className="text-green-600">Commitment</span>
              </h2>
              <div className="space-y-6">
                <p className="text-gray-700 text-lg leading-relaxed">
                  At <span className="font-semibold text-green-700">DailyDish</span>, we operate on three unwavering principles:
                </p>
                
                <div className="space-y-4">
                  {[
                    { title: "Freshness First", desc: "Ingredients are sourced daily from trusted local partners" },
                    { title: "Chef-Driven Quality", desc: "Every recipe is crafted and approved by our culinary experts" },
                    { title: "Sustainable Practices", desc: "Eco-friendly packaging and zero-waste kitchen initiatives" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="bg-green-100 p-2 rounded-lg">
                        <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2 order-1 lg:order-2"
              variants={fadeInRight}
            >
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"
                  alt="Commitment"
                  className="rounded-2xl shadow-2xl w-full object-cover"
                />
                <div className="absolute -bottom-4 -left-4 bg-white p-6 rounded-2xl shadow-xl max-w-xs">
                  <p className="text-green-600 font-bold">"Quality in every bite, care in every dish."</p>
                  <p className="text-gray-600 text-sm mt-2">- Our Kitchen Promise</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-gradient-to-br from-green-700 to-green-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-yellow-300">DailyDish</span>?
              </h2>
              <p className="text-green-100 text-lg max-w-2xl mx-auto">
                Discover what makes us different—and better—for your daily dining
              </p>
            </div>
            
            <motion.div 
              className="grid gap-8 md:grid-cols-2 lg:grid-cols-4"
              variants={staggerContainer}
            >
              {[
                { 
                  title: "Convenience", 
                  desc: "Order anytime, get meals delivered fresh to your home or office",
                  icon: "🚚"
                },
                { 
                  title: "Variety", 
                  desc: "Rotating menus with global flavors and dietary-specific options",
                  icon: "🌍"
                },
                { 
                  title: "Nutrition", 
                  desc: "Balanced meals crafted with guidance from nutrition experts",
                  icon: "🥗"
                },
                { 
                  title: "Reliability", 
                  desc: "Consistent quality and on-time delivery, guaranteed",
                  icon: "⏱️"
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300"
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-green-100">{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12">
              Vision & <span className="text-green-600">Mission</span>
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">👁️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Vision</h3>
                <p className="text-gray-700 leading-relaxed">
                  To become the most trusted daily meal partner worldwide, 
                  redefining convenience with uncompromising quality and 
                  creating joyful food moments in every household.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-2xl shadow-lg"
                whileHover={{ y: -5 }}
              >
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 leading-relaxed">
                  To make exceptional dining accessible to all by delivering 
                  chef-crafted, nutritious meals that inspire happiness, 
                  while nurturing communities and sustaining our planet.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

     
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={fadeInUp}
          >
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                What Our <span className="text-green-600">Customers Say</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Real stories from people who've made DailyDish part of their daily routine
              </p>
            </div>

            <div className="relative px-4">
              <Slider {...sliderSettings}>
                {testimonials.map((testi, i) => (
                  <div key={i} className="px-2 pb-2">
                    <motion.div 
                      className="bg-gray-50 p-6 md:p-8 rounded-2xl shadow-lg h-full border border-gray-100 hover:border-green-200 transition-all duration-300"
                      whileHover={{ y: -5 }}
                    >
                      <div className="flex flex-col items-center text-center">
                        <img
                          src={testi.img}
                          alt={testi.author}
                          className="w-20 h-20 rounded-full mb-4 object-cover border-4 border-white shadow-lg"
                        />
                        <div className="mb-6">
                          <p className="text-gray-700 italic text-lg mb-4 leading-relaxed">
                            "{testi.quote}"
                          </p>
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-lg">{testi.author}</h4>
                          <p className="text-green-600 text-sm">{testi.role}</p>
                          <div className="flex justify-center mt-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className="text-yellow-400 text-lg">★</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </Slider>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Daily Meals?
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
              Join thousands of happy customers who've made the switch to better eating
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {/* Contact Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/contact"
              className="inline-block bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
            >
              Contact Us
            </Link>
          </motion.div>

         
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to="/shop"
              className="inline-block bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
            >
              Shop Now
            </Link>
          </motion.div>
        </div>
          </motion.div>
        </div>
      </section>

      </div>
     <Footer/>
      </>
  );
};

export default About;