import React, { useRef, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";
import confetti from "canvas-confetti";

const BouquetResult = () => {
  const location = useLocation();

  const flowers = location.state?.flowers || [];
  const addOns = location.state?.addOns || [];
  const message = location.state?.message || "";
  const selectedCard = location.state?.selectedCard || {
    bg: "bg-pink-300",
    name: "Default Card",
    id: "default",
  };

  const cardRef = useRef();

  useEffect(() => {
    if (!selectedCard?.id) return;

    let colors = ["#ff69b4", "#ff1493"];

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-white">

      <div
        ref={cardRef}
        className={`relative max-w-md w-full p-6 rounded-3xl text-center shadow-2xl backdrop-blur-xl border ${selectedCard.bg}`}
      >

        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {flowers.map((flower, i) => (
            <img
              key={i}
              src={flower.image}
              className="w-20 h-20 rounded-full border-4 border-white shadow"
            />
          ))}
        </div>

        <p className="text-lg italic text-white">
          “{message}”
        </p>

        {addOns.length > 0 && (
          <p className="mt-3 text-sm text-white">
            🎁 {addOns.join(", ")}
          </p>
        )}

        <p className="mt-4 text-xs text-white/80">
          {selectedCard.name}
        </p>

      </div>

      <button
        onClick={handleDownload}
        className="absolute bottom-6 bg-green-500 text-white px-6 py-2 rounded-xl"
      >
        Download Card 📥
      </button>

    </div>
  );
};

export default BouquetResult;