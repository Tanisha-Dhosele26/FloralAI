import React, { useRef } from "react";
import { useLocation } from "react-router-dom";
import { toPng } from "html-to-image";

const flowerImages = {
  Rose: "https://images.unsplash.com/photo-1729864432143-2d91aa3736aa?q=80&w=735",
  Lily: "https://images.unsplash.com/photo-1639835170868-d43a19bbd180?q=80&w=1191",
  Tulip: "https://plus.unsplash.com/premium_photo-1671974490018-813bcb0d6635?q=80&w=1220",
  Daisy: "https://images.unsplash.com/photo-1686298804691-c7df01a856ef?q=80&w=1170",
};

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
  const { flowers, addOns, message, style } = location.state || {};
  const cardRef = useRef();

  const theme = themes[style] || themes.Romantic;

  const handleDownload = async () => {
    if (!cardRef.current) return;

    const dataUrl = await toPng(cardRef.current);

    const link = document.createElement("a");
    link.download = "bouquet.png";
    link.href = dataUrl;
    link.click();
  };

  if (!flowers) {
    return <div className="text-center mt-10">No bouquet data</div>;
  }

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${theme.bg} p-6`}>

      <div
        ref={cardRef}
        className="relative max-w-md w-full bg-white/70 backdrop-blur-xl border border-white/40 rounded-[30px] shadow-2xl p-6 text-center overflow-hidden"
      >
        {/* Decorative */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/30 rounded-full blur-2xl"></div>

        {/* Flowers */}
        <div className="flex justify-center gap-3 flex-wrap mb-4">
          {flowers.map((flower, index) => (
            <img
              key={index}
              src={flowerImages[flower]}
              alt={flower}
              className="w-20 h-20 object-cover rounded-full border-4 border-white shadow-lg hover:scale-110 transition"
            />
          ))}
        </div>

        {/* Title */}
        <h2 className={`text-2xl font-bold ${theme.text} mb-2`}>
          Your Digital Bouquet with Message to share💐
        </h2>

        {/* Add-ons */}
        {addOns.length > 0 && (
          <p className="text-gray-600 mb-3">
            🎁 With: {addOns.join(", ")}
          </p>
        )}

        {/* Message */}
        <div className="bg-white/60 border border-gray-200 rounded-2xl p-4 shadow-inner mt-4">
          <p className="text-gray-700 italic text-lg">
            “{message}”
          </p>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          Made with ❤️ using FloralAI personalized and customized for you.
        </p>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="absolute bottom-6 bg-green-500 text-white px-5 py-2 rounded-xl shadow-lg"
      >
        Download Bouquet Card 
      </button>

    </div>
  );
};

export default BouquetResult;