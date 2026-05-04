import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const cardStyles = [
  {
    id: "romantic",
    name: "Romantic 💖",
    bg: "bg-gradient-to-r from-pink-300 to-rose-400",
      stickers: ["❤️", "💖", "🌸","❤️"],
      animation :"hover:scale-105",
       image: "/assets/images/romantic.jpg",
  },
  {
    id: "elegant",
    name: "Elegant ✨",
    bg: "bg-gradient-to-r from-purple-400 to-indigo-500",
   stickers: ["✨", "💎", "🌟","✨"],
   animation:"hover:scale-105",
    image: "/assets/images/elegant.jpg",
  },
  {
    id: "festive",
    name: "Festive 🎉",
    bg: "bg-gradient-to-r from-yellow-300 to-orange-400",
    stickers: ["🎉", "🎊", "🌟","🎉", ],
   animation:"hover:scale-105",
    image: "./assets/images/festive.jpg",
  },
  {
    id: "calm",
    name: "Calm 🌿",
    bg: "bg-gradient-to-r from-green-300 to-teal-400",
    stickers: ["🌿", "🍃", "🌸","🌿"],
    animation: "hover:scale-105",
    image: "/assets/images/calm.jpg",
  },
  {
    id: "luxury",
    name: "Luxury 💎",
    bg: "bg-gradient-to-r from-gray-800 to-black",
    stickers: ["💎", "👑", "✨","💎"],
    animation: "hover:scale-105",
  },
  {
    id: "sunset",
    name: "Sunset 🌅",
    bg: "bg-gradient-to-r from-orange-400 to-pink-500",
    stickers: ["🌅", "🌇", "🌟","🌅"],
  },
];

const CardDesignPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { flowers, addOns, message } = location.state || {};
  const [selectedCard, setSelectedCard] = useState(null);

  if (!flowers) return <div className="text-center mt-10">No data found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-white py-20 px-4">

      <h1 className="text-3xl font-bold text-center text-pink-600 mb-10">
        Choose Your Card Design 🎨
      </h1>

      {/* GRID */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

        {cardStyles.map((card) => (
          <div
            key={card.id}
            onClick={() => setSelectedCard(card)}
            className={`cursor-pointer rounded-3xl p-4 shadow-xl transition-all duration-300
              ${card.bg}
              hover:scale-105 hover:shadow-2xl
              ${selectedCard?.id === card.id ? "ring-4 ring-pink-500 scale-105" : ""}
            `}
          >
            {/* 🌸 PREVIEW CARD */}
            <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 text-center">

              {/* FLOWERS */}
              <div className="flex justify-center gap-2 flex-wrap mb-3">
                {flowers.slice(0, 3).map((f, i) => (
                  <img
                    key={i}
                    src={f.image}
                    alt={f.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-white shadow"
                  />
                ))}
              </div>
               <div className="flex justify-center gap-2 flex-wrap mt-2">
  {card.stickers.map((s, i) => (
    <span key={i} className="text-xl">
      {s}
    </span>
  ))}
</div>


              {/* MESSAGE */}
              <p className="text-sm italic text-gray-700 line-clamp-2">
                “{message}”
              </p>

            </div>

            {/* NAME */}
            <h3 className="text-center mt-4 font-semibold text-white drop-shadow">
              {card.name}
            </h3>
          </div>
        ))}

      </div>

      {/* BUTTON */}
      <div className="text-center mt-12">
        <button
          onClick={() => {
            if (!selectedCard) {
              alert("Please select a card design");
              return;
            }

            navigate("/bouquetResult", {
              state: {
                flowers,
                addOns,
                message,
                selectedCard,
              },
            });
          }}
          className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
        >
          Continue 💐
        </button>
      </div>

    </div>
  );
};

export default CardDesignPage;