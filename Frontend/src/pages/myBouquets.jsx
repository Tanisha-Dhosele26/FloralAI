import React, { useEffect, useState } from "react";
import { authFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";

const MyBouquets = () => {
  const [bouquets, setBouquets] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBouquets = async () => {
      try {
        const data = await authFetch("/bouquets/my");
        setBouquets(data);
      } catch (err) {
        console.error("❌ Failed to fetch bouquets", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBouquets();
  }, []);

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-600">
        Loading your bouquets... 🌸
      </p>
    );
  }

  // 🌸 EMPTY STATE
  if (bouquets.length === 0) {
    return (
      <div className="text-center mt-20">
        <h2 className="text-2xl text-gray-600">No bouquets yet 💐</h2>
        <button
          onClick={() => navigate("/recommend")}
          className="mt-4 bg-pink-500 text-white px-6 py-2 rounded-xl"
        >
          Create Your First Bouquet 🌸
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4">

      {/* HEADER */}
      <h1 className="text-3xl font-bold text-center mb-10 text-pink-600">
        My Bouquets 💐
      </h1>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {bouquets.map((b, index) => (
          <div
            key={index}
            className="bg-white/60 backdrop-blur-lg border rounded-2xl p-5 shadow-lg hover:scale-105 transition"
          >

            {/* 🌸 FLOWERS */}
            <div className="flex justify-center gap-2 flex-wrap mb-4">
              {b.flowers?.map((f, i) => (
                <img
                  key={i}
                  src={f.image}
                  alt={f.name}
                  className="w-14 h-14 rounded-full object-cover border"
                />
              ))}
            </div>

            {/* 💌 MESSAGE */}
            <p className="text-gray-700 italic text-sm text-center mb-3">
              “{b.message || "No message added"}”
            </p>

            {/* 🎁 ADDONS */}
            <p className="text-xs text-gray-500 text-center mb-2">
              🎁 {b.addOns?.length ? b.addOns.join(", ") : "No add-ons"}
            </p>

            {/* 📅 DATE */}
            <p className="text-xs text-gray-400 text-center mb-4">
              {new Date(b.createdAt).toLocaleDateString()}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-2 justify-center">

              <button
                onClick={() =>
                  navigate("/bouquetResult", {
                    state: {
                      flowers: b.flowers,
                      addOns: b.addOns,
                      message: b.message,
                      style: b.style || "Romantic",
                    },
                  })
                }
                className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm hover:bg-pink-600"
              >
                View 💐
              </button>

              <button
                onClick={() =>
                  navigate("/recommend", {
                    state: {
                      occasion: b.occasion,
                      relationship: b.relationship,
                      personality: b.personality,
                    },
                  })
                }
                className="bg-white border text-pink-600 px-3 py-1 rounded-lg text-sm hover:bg-pink-50"
              >
                Reuse 🔁
              </button>

            </div>
          </div>
        ))}

      </div>
    </div>
  );
};

export default MyBouquets;