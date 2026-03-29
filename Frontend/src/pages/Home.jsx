import React from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";


const Home = () => {
  return (
    <>
      <main
        className="min-h-screen bg-fixed bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1526781100743-007e0dc2b474?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          backgroundSize: "cover",
        }}
      >
        {/*Hero section */}
        <section
          className="relative w-full min-h-[80vh] flex items-center justify-center text-center px-4"
          style={{
            backgroundImage:
              "url('https://plus.unsplash.com/premium_photo-1770153374749-5c0fc6259b63?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDQ0fHx8ZW58MHx8fHx8')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 "></div>
          <div className=" relative z-10 max-w-4xl mx-auto text-center text-white px-6 shadow-md">
            <motion.h1
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-5xl font-bold text-gray-700"
            >
              Find the Perfect Flowers for Every Emotion for Every Occasion
            </motion.h1>
            <p className="mt-4 text-gray-600 text-sm md:text-lg">
              Discover the language of flowers and find the perfect blooms for
              any occasion.
            </p>
            <div className="flex flex-col sm:flex-row mt-6 gap-4 justify-center">
              <Link to="/recommend">
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition">
                  Get Recommendation
                </button>
              </Link>
              <Link to="/encyclopedia">
                <button className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transition">
                  Explore Encyclopedia
                </button>
              </Link>
            </div>
          </div>
        </section>

        {/*Features section */}
        <section className="py-16 bg-gradient-to-b from-white to-pink-50">
          <div className="max-w-6xl mx-auto px-4 ">
            <h2 className="text-3xl font-bold text-center mb-10">
              Our Features
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md overflow-hidden p-4 text-center hover:shadow-pink-300 transition"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1721080251113-6da8c18b2992?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="cover"
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h3 className="mt-4 font-semibold text-lg text-pink-600">
                  Smart Recommendation
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Get peronalized flower suggestions based on your preference
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-pink-300 transition"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1666045749978-94b433bf4fc0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h3 className="mt-4 font-semibold text-lg text-pink-600">
                  Custome Gifts
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Add chocolates, greeting cards, and more to your floral
                  arrangements
                </p>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-white rounded-2xl shadow-md p-4 text-center hover:shadow-pink-300 transition"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1772707190580-5d8c8567fb1f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                  className="w-full h-40 object-cover rounded-xl"
                />
                <h3 className="mt-4 font-semibold text-lg text-pink-600">
                  Message Generator
                </h3>
                <p className="text-gray-500 text-sm mt-2">
                  Generate heartfelt messages for your loved ones
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/*Flower Cards section */}

        <section className="py-20 bg-gradient-to-b from-pink-50 to-white">
          <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Flower Encyclopedia
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {/*Daisy */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-md bg-white/30 border-white/40 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1686298804691-c7df01a856ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-2xl md:text-3xl text-pink-600">
                    Daisy
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Symbol of innocence and purity
                  </p>
                </div>
              </motion.div>

              {/*Rose */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-md bg-white/30 border-white/40 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1729864432143-2d91aa3736aa?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-2xl md:text-3xl text-pink-600">
                    Rose
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Symbol of love and passion
                  </p>
                </div>
              </motion.div>
              {/*Lily */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-md bg-white/30 border-white/40 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1639835170868-d43a19bbd180?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-2xl md:text-3xl text-pink-600">
                    Lily
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Symbol of purity and refinement
                  </p>
                </div>
              </motion.div>
              {/*Tulip */}
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="backdrop-blur-md bg-white/30 border-white/40 rounded-2xl shadow-lg overflow-hidden"
              >
                <img
                  src="https://plus.unsplash.com/premium_photo-1671974490018-813bcb0d6635?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="font-semibold text-2xl md:text-3xl text-pink-600">
                    Tulip
                  </h3>
                  <p className="text-gray-600 text-sm mt-2">
                    Symbol of perfect love
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        {/* Quick start Recommendation section */}

        <section className="py-24 flex justify-center items-center px-4">
          <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-3xl p-10 text-center max-w-2xl w-full">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-700">
              Let AI choose the Perfect Bouquet
            </h2>
            <p className="text-gray-600 mt-4 text-sm md:text-base">
              Get Personalized flower recommendation powered by AI
            </p>
            <Link to="/recommend">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="mt-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full shadow-lg"
              >
                Start Recommendation
              </motion.button>
            </Link>
          </div>
        </section>
      </main>
       <Footer/>
    </>
  );
};

export default Home;
