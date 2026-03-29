import React from "react";

const flowerImages = {
  Rose: "https://images.unsplash.com/photo-1729864432143-2d91aa3736aa?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Lily: "https://images.unsplash.com/photo-1639835170868-d43a19bbd180?q=80&w=1191&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Tulip:
    "https://plus.unsplash.com/premium_photo-1671974490018-813bcb0d6635?q=80&w=1220&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  Daisy:
    "https://images.unsplash.com/photo-1686298804691-c7df01a856ef?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
};

const RecommendedBouquet = ({ flowers }) => {
  if (!flowers.length) return null;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Recommended Bouquet 💐
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flowers.map((flower, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/40 border border-white/40 p-6 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition"
          >
            <img
              src={flowerImages[flower]}
              alt={flower}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center">
              <h3 className="text-lg font-semibold text-pink-600">{flower}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBouquet;
