import React, { useEffect, useState } from "react";

const RecommendedBouquet = ({ flowers }) => {
  const [images, setImages] = useState({});
  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  const fetchFlowerImage = async (flowerName) => {
    try {
      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${flowerName}&client_id=${ACCESS_KEY}`
      );

      const data = await res.json();

      return (
        data.results?.[0]?.urls?.regular ||
        "https://dummyimage.com/300x300/cccccc/000000&text=No+Image"
      );
    } catch (err) {
      return "https://dummyimage.com/300x300/cccccc/000000&text=Error";
    }
  };

  useEffect(() => {
    const loadImages = async () => {
      const temp = {};

      await Promise.all(
        flowers.map(async (flower) => {
          const name = flower.name;

          if (!name) return;

          const img = await fetchFlowerImage(name);
          temp[name] = img;
        })
      );

      setImages(temp);
    };

    if (flowers.length) loadImages();
  }, [flowers]);

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
                images[flower.name] ||
                "https://dummyimage.com/300x300/eeeeee/000000&text=Loading"
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