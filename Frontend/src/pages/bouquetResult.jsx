import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";

const BouquetResult = () => {
  const location = useLocation();

  const {
    flowers = [],
    addOns = [],
    message = "",
    selectedCard = {},
  } = location.state || {};

  const cardRef = useRef();

  // 🎉 CONFETTI ON LOAD
  useEffect(() => {
    if (!selectedCard) return;

    let colors = ["#ff69b4", "#ff1493"]; // default romantic

    if (selectedCard.id === "luxury") {
      colors = ["#FFD700", "#C0C0C0"];
    }

    if (selectedCard.id === "festive") {
      colors = ["#ff0", "#f00", "#0f0"];
    }

    confetti({
      particleCount: 120,
      spread: 80,
      colors,
    });
  }, [selectedCard]);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current);

    const link = document.createElement("a");
    link.download = "bouquet-card.png";
    link.href = dataUrl;
    link.click();
  };

  if (!flowers.length) {
    return <div className="text-center mt-10">No bouquet data</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white relative">

      {/* 💌 CARD */}
      <div
        ref={cardRef}
        className={`relative max-w-md w-full p-6 rounded-3xl text-center shadow-2xl backdrop-blur-xl border border-white/30
        ${selectedCard?.bg || "bg-pink-300"}
        `}
      >
        {/* 🌟 Glow */}
        <div className="absolute inset-0 bg-white/10 rounded-3xl blur-xl"></div>

        {/* ✨ AUTO STICKERS (TOP LEFT) */}
        {/* ✨ RANDOM STICKERS */}
{selectedCard?.stickers?.map((s, i) => {
  const top = Math.random() * 80;   // % position
  const left = Math.random() * 80;

  const stickerPositions = selectedCard?.stickers?.map(() => ({
  top: Math.random() * 80,
  left: Math.random() * 80,
  rotate: Math.random() * 40 - 20,
}));


  return (
    <span
      key={i}
      className="absolute text-2xl opacity-80"
      style={{
        top: `${top}%`,
        left: `${left}%`,
        transform: `rotate(${Math.random() * 40 - 20}deg)`,
      }}
    >
      {s}
    </span>
  );
})}



        {/* 🌸 FLOWERS */}
        <div className="flex justify-center gap-3 flex-wrap mb-4 relative z-10">
          {flowers.map((flower, index) => (
            <img
              key={index}
              src={flower.image}
              alt={flower.name}
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg hover:scale-110 transition"
            />
          ))}
        </div>

        {/* 💌 MESSAGE */}
        <p className="text-lg italic mt-4 text-white relative z-10">
          “{message}”
        </p>

        {/* 🎁 ADDONS */}
        {addOns.length > 0 && (
          <p className="mt-3 text-sm text-white relative z-10">
            🎁 {addOns.join(", ")}
          </p>
        )}

        {/* ✨ FOOTER */}
        <p className="mt-6 text-xs text-white/80 relative z-10">
          Made with ❤️ FloralAI
        </p>
      </div>

      {/* 📥 DOWNLOAD */}
      <button
        onClick={handleDownload}
        className="absolute bottom-6 bg-green-500 text-white px-6 py-2 rounded-xl shadow-lg hover:scale-110 transition"
      >
        Download Card 📥
      </button>
    </div>
  );
};

export default BouquetResult;