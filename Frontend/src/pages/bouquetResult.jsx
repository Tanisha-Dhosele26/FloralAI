import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";

const themes = {
  Romantic: {
    bg: "from-pink-200 via-rose-100 to-pink-300",
    text: "text-pink-600",
  },
  Friendly: {
    bg: "from-yellow-200 via-orange-100 to-yellow-300",
    text: "text-yellow-600",
  },
  Formal: {
    bg: "from-blue-200 via-indigo-100 to-blue-300",
    text: "text-blue-600",
  },
};

const BouquetResult = () => {
  const location = useLocation();

  const {
    flowers = [],
    addOns = [],
    message = "",
    style = "Romantic",
  } = location.state || {};

  const cardRef = useRef();
  const theme = themes[style] || themes.Romantic;

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const dataUrl = await toPng(cardRef.current);

      const link = document.createElement("a");
      link.download = "bouquet.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed:", err);
    }
  };

  if (!flowers || flowers.length === 0) {
    return <div className="text-center mt-10">No bouquet data</div>;
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bg} p-6`}
    >
      {/* 💌 CARD */}
      <div
        ref={cardRef}
        className="relative max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[30px] shadow-2xl p-6 text-center overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>

        {/* 🌸 FLOWERS */}
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {flowers.map((flower, index) => (
            <img
              key={index}
              src={
                flower.image ||
                "https://dummyimage.com/200x200/cccccc/000000&text=No+Image"
              }
              alt={flower.name}
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg hover:scale-110 transition"
              onError={(e) => {
                e.target.src =
                  "https://dummyimage.com/200x200/ffcccc/000000&text=Error";
              }}
            />
          ))}
        </div>

        {/* 💐 TITLE */}
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
          Your Digital Bouquet 💐
        </h2>

        {/* 🎁 ADD-ONS */}
        {addOns.length > 0 && (
          <p className="text-gray-600 mb-3">
            🎁 With: {addOns.join(", ")}
          </p>
        )}

        {/* 💌 MESSAGE */}
        <div className="bg-white/60 border border-gray-200 rounded-2xl p-4 shadow-inner mt-4">
          <p className="text-gray-700 italic text-lg">
            “{message}”
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Made with ❤️ using FloralAI
        </p>
      </div>

      {/* 📥 DOWNLOAD */}
      <button
        onClick={handleDownload}
        className="absolute bottom-6 bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg hover:scale-105 transition"
      >
        Download Message Card 💾
      </button>
    </div>
  );
};

export default BouquetResult;