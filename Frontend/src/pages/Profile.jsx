import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    window.dispatchEvent(new Event("storage"));

    navigate("/login");
  };

  if (!user) {
    return (
      <div className="text-center mt-20 text-gray-600">
        No user logged in
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4">

      {/* 🌸 HEADER */}
      <div className="max-w-4xl mx-auto text-center mb-10">
        <h1 className="text-4xl font-bold text-pink-600">
          Welcome, {user.name} 🌸
        </h1>
        <p className="text-gray-500 mt-2">
          Manage your bouquets and profile
        </p>
      </div>

      {/* 👤 PROFILE CARD */}
      <div className="max-w-4xl mx-auto bg-white/60 backdrop-blur-md border rounded-3xl shadow-xl p-6">

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">

          {/* LEFT */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-500">{user.email}</p>

            <div className="mt-4 flex gap-3 flex-wrap justify-center md:justify-start">
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full text-sm">
                FloralAI User
              </span>
              <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm">
                Active 🌿
              </span>
            </div>
          </div>

          {/* RIGHT ACTIONS */}
          <div className="flex flex-col gap-3 w-full md:w-auto">

            <button
              onClick={() => navigate("/recommend")}
              className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-6 py-2 rounded-xl shadow hover:scale-105 transition"
            >
              Create Bouquet 💐
            </button>

            <button
              onClick={() => navigate("/myBouquets")}
              className="bg-white border text-pink-600 px-6 py-2 rounded-xl shadow hover:bg-pink-50 transition"
            >
              My Bouquets 🌸
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2 rounded-xl shadow hover:bg-red-600 transition"
            >
              Logout 🚪
            </button>

          </div>
        </div>
      </div>

      {/* 📊 DASHBOARD CARDS */}
      <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6 mt-10">

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow text-center">
          <h3 className="text-2xl font-bold text-pink-600">🌸</h3>
          <p className="text-gray-600 mt-2">Your Bouquets</p>
          <button
            onClick={() => navigate("/myBouquets")}
            className="mt-3 text-sm text-pink-500 hover:underline"
          >
            View All
          </button>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow text-center">
          <h3 className="text-2xl font-bold text-yellow-500">🎁</h3>
          <p className="text-gray-600 mt-2">Add-ons Used</p>
          <p className="text-sm text-gray-400 mt-1">Coming Soon</p>
        </div>

        <div className="bg-white/60 backdrop-blur-md p-6 rounded-2xl shadow text-center">
          <h3 className="text-2xl font-bold text-blue-500">💌</h3>
          <p className="text-gray-600 mt-2">Messages Created</p>
          <p className="text-sm text-gray-400 mt-1">Coming Soon</p>
        </div>

      </div>

    </div>
  );
};

export default Profile;