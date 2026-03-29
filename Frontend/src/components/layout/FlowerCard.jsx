import React from "react";
import { motion } from "framer-motion";

const FlowerCard = ({ flower, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="cursor-pointer backdrop-blur-xl bg-white/10 border border-white/30 rounded-2xl shadow-xl overflow-hidden"
    >
      <img
        src={flower.image}
        alt={flower.name}
        className="w-full h-40 object-cover"
      />

      <div className="p-4 text-center">
        <h3 className="text-lg font-semibold text-pink-600">
          {flower.name}
        </h3>

        <p className="text-sm text-gray-600 mt-2">
          {flower.meaning}
        </p>
      </div>
    </motion.div>
  );
};

export default FlowerCard;