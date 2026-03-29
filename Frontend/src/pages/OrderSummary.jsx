import React from "react";
import { useLocation } from "react-router-dom";

const OrderSummary = () => {
  const location = useLocation();
  const { flowers = [], addOns = [], message = "" } = location.state || {};

  // 💰 Pricing
  const flowerPrices = {
    Rose: 200,
    Lily: 180,
    Tulip: 220,
    Daisy: 150,
  };

  const addonPrices = {
    Chocolate: 100,
    Teddy: 250,
    Card: 50,
  };

  // 💰 Calculate totals
  const flowerTotal = flowers.reduce(
    (total, item) => total + (flowerPrices[item] || 0),
    0
  );

  const addonTotal = addOns.reduce(
    (total, item) => total + (addonPrices[item] || 0),
    0
  );

  const grandTotal = flowerTotal + addonTotal;

  return (
    <div className="min-h-screen py-20 px-4 bg-gradient-to-b from-pink-50 via-white to-pink-100">

      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-700">
        Order Summary 🧾
      </h1>

      <div className="max-w-3xl mx-auto space-y-6">

        {/* Flowers */}
        <div className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">
            Selected Flowers 🌸
          </h2>

          {flowers.length > 0 ? (
            flowers.map((flower, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{flower}</span>
                <span>₹{flowerPrices[flower]}</span>
              </div>
            ))
          ) : (
            <p>No flowers selected</p>
          )}

          <div className="mt-3 font-semibold text-right">
            Total: ₹{flowerTotal}
          </div>
        </div>

        {/* Add-ons */}
        <div className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">
            Add-ons 🎁
          </h2>

          {addOns.length > 0 ? (
            addOns.map((item, index) => (
              <div key={index} className="flex justify-between py-1">
                <span>{item}</span>
                <span>₹{addonPrices[item]}</span>
              </div>
            ))
          ) : (
            <p>No add-ons selected</p>
          )}

          <div className="mt-3 font-semibold text-right">
            Total: ₹{addonTotal}
          </div>
        </div>

        {/* Message */}
        <div className="backdrop-blur-md bg-white/40 border border-white/40 rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-pink-600">
            Message 💌
          </h2>
          <p className="bg-white/60 p-4 rounded-xl">
            {message || "No message generated"}
          </p>
        </div>

        {/* Grand Total */}
        <div className="backdrop-blur-md bg-white/50 border border-white/40 rounded-2xl shadow-lg p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">
            Total Amount 💰
          </h2>
          <p className="text-3xl font-bold text-green-600 mt-2">
            ₹{grandTotal}
          </p>

          <button className="mt-6 w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl shadow hover:scale-105 transition">
            Place Order 🚀
          </button>
        </div>

      </div>
    </div>
  );
};

export default OrderSummary;