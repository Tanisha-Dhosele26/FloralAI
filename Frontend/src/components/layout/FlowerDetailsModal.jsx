import React from "react";
import { motion } from "framer-motion";

const FlowerDetailsModal = ({ flower, onClose }) => {
  if (!flower) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
    >
      {/* Modal Card */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-[90%] max-w-md rounded-3xl overflow-hidden shadow-2xl backdrop-blur-lg bg-white/20 border border-white/30 "
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-white text-xl hover:scale-110 transition"
        >
          ✖
        </button>

        {/* Image */}
        <img
          src={flower.image}
          alt={flower.name}
          className="w-full h-56 object-cover rounded-3xl  p-4"
        />

        {/* Content */}
        <div className="p-6 text-center bg-white">
          <h2 className="text-2xl font-bold text-pink-600">
            {flower.name}
          </h2>

          <p className="text-gray-700 mt-2 font-medium">
            {flower.meaning} 
          </p>

          <p className="text-gray-600 mt-4 text-sm leading-relaxed">
            {flower.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default FlowerDetailsModal;