import React from "react";
import { useState } from "react";

const RecommendationForm = ({ onRecommend }) => {
  const [formData, setformData] = useState({
    occasion: "",
    relationship: "",
    mood: "",
  });

  const handleChange = (e) => {
    setformData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted :");
    console.log(formData);
    onRecommend(formData);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">

  <select
    name="occasion"
    onChange={handleChange}
    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
  >
    <option value="">Select Occasion</option>
    <option>Birthday</option>
    <option>Anniversary</option>
    <option>Propose</option>
  </select>

  <select
    name="relationship"
    onChange={handleChange}
    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
  >
    <option value="">Relationship</option>
    <option>Family</option>
    <option>Friend</option>
    <option>Partner</option>
  </select>

  <select
    name="mood"
    onChange={handleChange}
    className="w-full p-3 rounded-xl border focus:ring-2 focus:ring-pink-400 outline-none"
  >
    <option value="">Select Mood</option>
    <option>Happy</option>
    <option>Calm</option>
    <option>Romantic</option>
  </select>

  <button
    type="submit"
    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-3 rounded-xl shadow hover:scale-105 transition"
  >
    Get Recommendation
  </button>

</form>
    </>
  );
};

export default RecommendationForm;
