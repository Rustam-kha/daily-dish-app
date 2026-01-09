import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock,
  Home,
  Users,
  Contact,
  ChefHat,
  Truck,
  Utensils,
  ArrowUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const quickLinks = [
    { name: 'Home', href: '/', icon: <Home className="w-4 h-4" /> },
    { name: 'Shop', href: '/shop', icon: <Users className="w-4 h-4" /> },
    { name: 'About Us', href: '/about', icon: <Users className="w-4 h-4" /> },
    { name: 'Contact', href: '/contact', icon: <Contact className="w-4 h-4" /> },
  ];

  const contactInfo = [
    { icon: <Phone className="w-5 h-5" />, text: '+923325577359' },
    { icon: <Mail className="w-5 h-5" />, text: 'rustamkhanafridi0332@gmail.com' },
    { icon: <MapPin className="w-5 h-5" />, text: 'HMC UET Taxila' },
    { icon: <Clock className="w-5 h-5" />, text: 'Mon-Sun: 8AM - 10PM' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
  };

  return (
    <div>
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-6 right-25 bg-green-600 text-white p-4 rounded-full shadow-xl z-50 hover:bg-green-700 transition-colors"
            title="Scroll to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      <motion.footer
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="bg-gray-900 text-white pt-16 pb-8 px-6 md:px-12 lg:px-16 mt-auto"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          >
            <motion.div variants={itemVariants} className="space-y-5">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-3"
              >
                <ChefHat className="w-8 h-8 text-emerald-400" />
                <h2 className="text-2xl font-bold text-emerald-400 tracking-tight">
                  DailyDish
                </h2>
              </motion.div>
              <p className="text-gray-300 leading-relaxed text-sm">
                Fresh, delicious meals delivered to your doorstep. We connect
                you with local chefs and fresh ingredients for a convenient and
                exceptional dining experience.
              </p>
              <div className="flex space-x-4 pt-2">
                {[Truck, ChefHat, Utensils].map((Icon, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shadow-sm"
                  >
                    <Icon className="w-5 h-5 text-emerald-400" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-5">
              <motion.h3
                initial={{ width: 0 }}
                whileInView={{ width: "40px" }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-emerald-400 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-emerald-400"
              >
                Quick Links
              </motion.h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 5 }}
                    className="overflow-hidden"
                  >
                    <motion.a
                      href={link.href}
                      className="flex items-center space-x-3 text-gray-300 hover:text-emerald-400 transition-colors group"
                    >
                      <motion.span
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="inline-block"
                      >
                        {link.icon}
                      </motion.span>
                      <span className="group-hover:underline">{link.name}</span>
                    </motion.a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-5">
              <motion.h3
                initial={{ width: 0 }}
                whileInView={{ width: "40px" }}
                viewport={{ once: true }}
                className="text-lg font-semibold text-emerald-400 pb-2 relative after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-10 after:h-0.5 after:bg-emerald-400"
              >
                Contact Info
              </motion.h3>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5 }}
                    className="flex items-center space-x-4"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.3 }}
                      className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center shadow-md"
                    >
                      <div className="text-gray-900">{item.icon}</div>
                    </motion.div>
                    <span className="text-gray-300 text-sm">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="h-px bg-gradient-to-r from-transparent via-emerald-400/30 to-transparent my-10"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-400 text-sm pt-4"
          >
            <p>
              &copy; {new Date().getFullYear()} DailyDish. All rights reserved.
              Fresh Food Delivery Service.
            </p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Footer;
