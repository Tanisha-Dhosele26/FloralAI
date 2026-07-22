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
        const data = await authFetch("https://floralai.onrender.com/api/bouquets/my");
        setBouquets(data || []);
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

  if (!bouquets.length) {
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

      <h1 className="text-3xl font-bold text-center mb-10 text-pink-600">
        My Bouquets 💐
      </h1>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

        {bouquets.map((b) => {

          const card = b.selectedCard || {};

          return (
            <div
              key={b._id}
              className={`rounded-2xl p-5 shadow-lg hover:scale-105 transition
              ${card.bg || "bg-white"}`}
            >

              {/* FLOWERS */}
              <div className="flex justify-center gap-2 flex-wrap mb-3">
                {b.flowers?.map((f, i) => (
                  <img
                    key={i}
                    src={f.image}
                    alt={f.name}
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                ))}
              </div>

              {/* CARD TYPE */}
              <div className="text-center text-xs mb-2 font-semibold text-white/90">
                🎨 {card.name || "Default Card"}
              </div>

              {/* MESSAGE */}
              <p className="text-gray-800 italic text-sm text-center mb-3">
                “{b.message || "No message added"}”
              </p>

              {/* ADDONS */}
              <p className="text-xs text-center mb-2 text-white/80">
                🎁 {b.addOns?.length ? b.addOns.join(", ") : "No add-ons"}
              </p>

              {/* DATE */}
              <p className="text-xs text-center text-white/70 mb-4">
                {new Date(b.createdAt).toLocaleDateString()}
              </p>

              {/* BUTTONS */}
              <div className="flex gap-2 justify-center">

                <button
                  onClick={() =>
                    navigate("/bouquetResult", {
                      state: {
                        flowers: b.flowers,
                        addOns: b.addOns,
                        message: b.message,
                        selectedCard: b.selectedCard || {},
                      },
                    })
                  }
                  className="bg-pink-500 text-white px-3 py-1 rounded-lg text-sm"
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
                  className="bg-white text-pink-600 px-3 py-1 rounded-lg text-sm"
                >
                  Reuse 🔁
                </button>

              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyBouquets;