import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="relative mt-20  backdrop-blur-lg">
      
      {/* Glass Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-300 via-rose-400 t0 pink-600"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">

        {/*  Logo / About */}
        <div>
          <h2 className="text-xl font-bold text-pink-600">
            FloralAI 🌸
          </h2>
          <p className="text-gray-700 mt-2 text-sm">
            Discover the perfect flowers for every emotion with AI-powered recommendations.
          </p>
        </div>

        {/* 🔗 Navigation */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Quick Links
          </h3>
          <div className="flex flex-col gap-2 text-gray-600 text-sm">
            <Link to="/" className="hover:text-pink-500 transition">
              Home
            </Link>
            <Link to="/recommend" className="hover:text-pink-500 transition">
              Recommendation
            </Link>
            <Link to="/encyclopedia" className="hover:text-pink-500 transition">
              Encyclopedia
            </Link>
            <Link to="/profile" className="hover:text-pink-500 transition">
              Profile
            </Link>
          </div>
        </div>

        {/*  Social */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-3">
            Connect
          </h3>
          <div className="flex justify-center md:justify-start gap-4 text-xl">

            <span className="cursor-pointer hover:scale-110 transition">🌐</span>
            <span className="cursor-pointer hover:scale-110 transition">💼</span>
            <span className="cursor-pointer hover:scale-110 transition">📧</span>

          </div>

          <p className="text-gray-600 text-sm mt-3">
            floralai@gmail.com
          </p>
        </div>
      </div>

      {/* Bottom Line */}
      <div className="relative z-10 text-center text-gray-600 text-sm pb-4">
        © 2026 FloralAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;