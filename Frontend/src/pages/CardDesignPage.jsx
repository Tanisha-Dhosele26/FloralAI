import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";
import { animate } from "framer-motion";

const cardStyles = [
  {
    id: "romantic",
    name: "Romantic 💖",
    bg: "bg-gradient-to-r from-pink-300 to-rose-400",
    stickers: ["❤️", "💖", "🌸", "❤️"],
    animation: "hover:scale-110",
  },
  {
    id: "elegant",
    name: "Elegant ✨",
    bg: "bg-gradient-to-r from-purple-400 to-indigo-500",
    stickers: ["✨", "💎", "🌟", "✨"],
    animation: "hover:scale-110",
  },
  {
    id: "festive",
    name: "Festive 🎉",
    bg: "bg-gradient-to-r from-yellow-300 to-orange-400",
    stickers: ["🎉", "🎊", "🌟", "🎉"],
    animation: "hover:scale-110",
  },
  {
    id: "calm",
    name: "Calm 🌿",
    bg: "bg-gradient-to-r from-green-300 to-teal-400",
    stickers: ["🌿", "🍃", "🌸", "🌿"],
    animation: "hover:scale-110",
  },
  {
    id: "luxury",
    name: "Luxury 💎",
    bg: "bg-gradient-to-r from-gray-800 to-black",
    stickers: ["💎", "👑", "✨", "💎"],
    animation: "hover:scale-110",
  },
  {
    id: "sunset",
    name: "Sunset 🌅",
    bg: "bg-gradient-to-r from-orange-400 to-pink-500",
    stickers: ["🌅", "🌇", "🌟", "🌅"],
    animation: "hover:scale-110",
  },
];

const CardDesignPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { flowers, addOns, message, occasion, relationship, personality } =
    location.state || {};

  const [selectedCard, setSelectedCard] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!flowers) return <div>No data found</div>;

  const handleSaveAndContinue = async () => {
    if (!selectedCard) {
      alert("Select a card first");
      return;
    }

    try {
      setLoading(true);

      const res = await authFetch("/bouquets", {
        method: "POST",
        body: JSON.stringify({
          flowers,
          addOns,
          message,
          occasion,
          relationship,
          personality,
          selectedCard,
          digitalBouquetUrl: "generated URL here",
        }),
      });

      navigate("/bouquetResult", {
        state: {
          flowers,
          addOns,
          message,
          selectedCard,
        },
      });
    } catch (err) {
      console.error(err);
      alert("Failed to save bouquet");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <h1 className="text-4xl text-center mb-10 text-rose-700">Choose Card</h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-6xl  mx-auto">
        {cardStyles.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`p-4 rounded-2xl cursor-pointer ${
              card.bg
            } ${selectedCard?.id === card.id ? "ring-4 ring-pink-500" : ""} ${card.animation}`}
          >
            <div className="bg-white/70 p-4 rounded-xl text-center">
              {flowers.slice(0, 3).map((f, i) => (
                <img
                  key={i}
                  src={f.image}
                  className="w-12 h-12 rounded-full inline-block mx-1"
                />
              ))}

              <p className="mt-2 italic">"{message}"</p>
            </div>

            <h3 className="text-center mt-3 text-white">{card.name}</h3>
          </div>
        ))}
      </div>

      {/* FIXED BUTTON (not full width) */}
      <div className="flex justify-center mt-10">
        <button
          onClick={handleSaveAndContinue}
          disabled={loading}
          className="w-auto px-8 py-3 bg-green-500 text-white rounded-xl"
        >
          {loading ? "Saving..." : "Save & Download 💐"}
        </button>
      </div>
    </div>
  );
};

export default CardDesignPage;