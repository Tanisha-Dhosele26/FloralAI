import React from "react";

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
            className="bg-white/40 p-6 rounded-2xl shadow-lg"
          >
            <img
              src={
                flower.image ||
                "https://dummyimage.com/300x300/eeeeee/000000&text=No+Image"
              }
              alt={flower.name}
              className="w-full h-40 object-cover rounded"
            />

            <h3 className="text-lg font-semibold mt-3 text-pink-600">
              {flower.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedBouquet;