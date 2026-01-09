import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { FiMail, FiPhone, FiMapPin, FiClock, FiSend, FiCheck } from "react-icons/fi";
import { FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp } from "react-icons/fa";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { API_URL } from "../config";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);
    setReferenceId("");

    try {
      const response = await axios.post(`${API_URL}/api/contact`, {
        ...data,
        source: "website_contact_form",
      });

      if (response.data.success) {
        setSubmitSuccess(true);
        reset();

        if (response.data.referenceId) {
          setReferenceId(response.data.referenceId);
        }

        setTimeout(() => {
          setSubmitSuccess(false);
          setReferenceId("");
        }, 8000);
      } else {
        setSubmitError(response.data.message || "Failed to send message");
      }
    } catch (error) {
      setSubmitError(
        error.response?.data?.message ||
          error.response?.data?.errors?.join(", ") ||
          "Failed to send message. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <FiPhone className="text-2xl" />,
      title: "Call Us",
      details: ["+923325577359"],
      action: "tel:+923325577359",
    },
    {
      icon: <FiMail className="text-2xl" />,
      title: "Email Us",
      details: ["rustamkhanafridi0332@gmail.com"],
      action: "mailto:rustamkhanafridi0332@gmail.com",
    },
    {
      icon: <FiMapPin className="text-2xl" />,
      title: "Visit Us",
      details: ["HMC Road UET Taxila"],
      action: "https://maps.google.com",
    },
    {
      icon: <FiClock className="text-2xl" />,
      title: "Business Hours",
      details: ["Mon-Fri: 7:00 AM - 10:00 PM", "Sat-Sun: 8:00 AM - 11:00 PM"],
      action: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaWhatsapp />,
      label: "WhatsApp",
      href: "https://wa.me/15551234567",
      color: "bg-green-500",
    },
    {
      icon: <FaInstagram />,
      label: "Instagram",
      href: "https://instagram.com/dailydish",
      color: "bg-pink-500",
    },
    {
      icon: <FaTwitter />,
      label: "Twitter",
      href: "https://twitter.com/dailydish",
      color: "bg-blue-400",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      href: "https://linkedin.com/company/dailydish",
      color: "bg-blue-600",
    },
  ];

  const faqs = [
    {
      question: "How quickly do you respond to contact requests?",
      answer:
        "We typically respond within 1-2 hours during business hours and within 24 hours maximum.",
    },
    {
      question: "Can I modify or cancel my order after contacting?",
      answer:
        "Yes, we can modify or cancel orders within 30 minutes of placement. Contact us immediately.",
    },
    {
      question: "Do you handle dietary restrictions and allergies?",
      answer:
        "Absolutely! Our chefs are trained to handle all dietary requirements. Please specify in your message.",
    },
    {
      question: "Is there customer support available on weekends?",
      answer:
        "Yes, our customer support team is available 7 days a week during business hours.",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <motion.section
          className="relative py-20 bg-gradient-to-r from-green-700 to-green-900 text-white overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="absolute inset-0 bg-black/20" />
          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              className="max-w-3xl mx-auto text-center"
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Get in <span className="text-yellow-300">Touch</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-100 mb-8">
                We're here to serve you better. Reach out for inquiries,
                support, or just to say hello!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.a
                  href="#contact-form"
                  className="bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Send a Message
                </motion.a>
                <motion.a
                  href="tel:+923325577359"
                  className="bg-transparent border-2 border-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.section>

        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Multiple Ways to{" "}
                  <span className="text-green-600">Connect</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Choose your preferred method to reach our dedicated support
                  team
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                    whileHover={{ y: -5 }}
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors duration-300">
                        {item.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {item.title}
                      </h3>
                      <div className="space-y-1">
                        {item.details.map((detail, i) => (
                          <p key={i} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                      {item.action && (
                        <a
                          href={item.action}
                          className="mt-4 text-green-600 hover:text-green-700 font-semibold text-sm"
                        >
                          Click to {item.title.toLowerCase()}
                        </a>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section id="contact-form" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-10"
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Send Us a <span className="text-green-600">Message</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  Fill out the form below and we'll get back to you within 24
                  hours
                </p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        {...register("firstName", {
                          required: "First name is required",
                        })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        {...register("lastName", {
                          required: "Last name is required",
                        })}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      {...register("phone", {
                        pattern: {
                          value: /^[\+]?[1-9][\d\s\-\(\)]{8,}$/,
                          message: "Invalid phone number",
                        },
                      })}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subject *
                    </label>
                    <select
                      {...register("subject", {
                        required: "Please select a subject",
                      })}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.subject ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all`}
                    >
                      <option value="">Select a subject</option>
                      <option value="general">General Inquiry</option>
                      <option value="order">Order Support</option>
                      <option value="billing">Billing Question</option>
                      <option value="feedback">Feedback/Suggestion</option>
                      <option value="partnership">Business Partnership</option>
                      <option value="career">Career Opportunity</option>
                    </select>
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register("message", {
                        required: "Message is required",
                        minLength: {
                          value: 20,
                          message: "Minimum 20 characters required",
                        },
                      })}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.message ? "border-red-500" : "border-gray-300"
                      } focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition-all resize-none`}
                      placeholder="Tell us how we can help you..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {submitSuccess && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center text-green-800">
                        <FiCheck className="w-5 h-5 mr-2" />
                        <span className="font-medium">
                          Message sent successfully!
                        </span>
                      </div>
                      <p className="text-green-600 text-sm mt-1">
                        We'll get back to you within 24 hours.
                        {referenceId && (
                          <span className="block mt-1 font-medium">
                            Reference ID: {referenceId}
                          </span>
                        )}
                      </p>
                    </div>
                  )}

                  {submitError && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center text-red-800">
                        <FiSend className="w-5 h-5 mr-2" />
                        <span className="font-medium">
                          Error sending message
                        </span>
                      </div>
                      <p className="text-red-600 text-sm mt-1">{submitError}</p>
                    </div>
                  )}

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center ${
                      isSubmitting
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl"
                    }`}
                    whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <FiSend className="mr-3" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>

              <div className="space-y-8">
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl overflow-hidden"
                >
                  <div className="p-6 border-b border-gray-100">
                    <h3 className="text-xl font-bold text-gray-900">
                      Our <span className="text-green-600">Location</span>
                    </h3>
                  </div>
                  <div className="relative h-80 bg-gray-200">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d25221.956510781976!2d72.81608609999999!3d33.76428255!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2s!4v1767976835869!5m2!1sen!2s"
                      width="100%"
                      height="400"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="UET Taxila Location"
                    />
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 text-sm">
                      Visit our flagship store or schedule a meeting with our
                      team
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-xl p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Connect on{" "}
                    <span className="text-green-600">Social Media</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${social.color} text-white rounded-xl p-4 flex flex-col items-center justify-center hover:opacity-90 transition-all duration-300`}
                        whileHover={{ y: -3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className="text-2xl mb-2">{social.icon}</div>
                        <span className="text-sm font-medium">
                          {social.label}
                        </span>
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
            >
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Frequently Asked{" "}
                  <span className="text-green-600">Questions</span>
                </h2>
                <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                  Quick answers to common questions
                </p>
              </div>

              <div className="max-w-3xl mx-auto">
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="mb-4 last:mb-0"
                  >
                    <div className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors duration-300 border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
                        <span className="w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-sm">
                          Q
                        </span>
                        {faq.question}
                      </h3>
                      <p className="text-gray-600 ml-9">{faq.answer}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-green-50 to-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Meet Our <span className="text-green-600">Support Team</span>
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Dedicated professionals ready to assist you
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  name: "Ahmad Khan",
                  role: "Customer Support Lead",
                  email: "ahmad@dailydish.com",
                },
                {
                  name: "Ali Khan",
                  role: "Order Specialist",
                  email: "ali@dailydish.com",
                },
                {
                  name: "Muhammad Bilal",
                  role: "Nutrition Consultant",
                  email: "bilal@dailydish.com",
                },
              ].map((member, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                  whileHover={{ y: -5 }}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-green-600 font-medium mb-4">
                    {member.role}
                  </p>
                  <a
                    href={`mailto:${member.email}`}
                    className="text-gray-600 hover:text-green-600 text-sm font-medium transition-colors"
                  >
                    {member.email}
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-green-700 to-green-900 text-white">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Still Have Questions?
              </h2>
              <p className="text-xl mb-8 max-w-2xl mx-auto text-green-100">
                Our team is available 24/7 for urgent inquiries
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="tel:+923325577359"
                  className="bg-white text-green-700 hover:bg-gray-100 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Call Now: +923325577359
                </motion.a>
                <motion.a
                  href="mailto:rustamkhanafridi0332@gmail.com"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold py-3 px-8 rounded-full text-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Email Support
                </motion.a>
              </div>
              <p className="mt-8 text-green-200 text-sm">
                Average response time:{" "}
                <span className="font-bold">under 2 hours</span>
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Contact;