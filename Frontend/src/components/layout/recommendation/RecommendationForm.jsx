import React, { useState } from "react";

const RecommendationForm = ({ onRecommend }) => {
  const [formData, setFormData] = useState({
    occasion: "",
    relationship: "",
    personality: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.occasion || !formData.relationship) {
      alert("Please fill required fields");
      return;
    }

    onRecommend(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      {/* 🎯 OCCASION */}
      <select
        name="occasion"
        onChange={handleChange}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
      >
        <option value="">Select Occasion</option>
        <option>Birthday</option>
        <option>Anniversary</option>
        <option>Proposal</option>
        <option>Graduation</option>
        <option>Business Opening</option>
      </select>

      {/* 👥 RELATIONSHIP */}
      <select
        name="relationship"
        onChange={handleChange}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
      >
        <option value="">Select Relationship</option>
        <option>Mother</option>
        <option>Father</option>
        <option>Friend</option>
        <option>Teacher</option>
        <option>Boss</option>
        <option>Partner</option>
        <option>Sibling</option>
      </select>

      {/* 🧠 PERSONALITY */}
      <textarea
        name="personality"
        placeholder="Describe personality (e.g. cheerful, calm, romantic)"
        onChange={handleChange}
        className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
      />

      {/* 🚀 BUTTON */}
      <button
        type="submit"
        className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl shadow hover:scale-105 transition"
      >
        Get AI Recommendation 🌸
      </button>

    </form>
  );
};

export default RecommendationForm;