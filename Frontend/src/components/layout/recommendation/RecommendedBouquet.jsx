import React, { useEffect, useState } from "react";

const RecommendedBouquet = ({ flowers }) => {
  const [images, setImages] = useState({});

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // 🔥 Fetch image from Unsplash API
  const fetchFlowerImage = async (flower) => {
    try {
      // ❌ If API key missing, skip call
      if (!ACCESS_KEY) {
        console.error("Missing Unsplash API Key");
        return "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
      }

      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${flower}&client_id=${ACCESS_KEY}`
      );

      if (!res.ok) {
        throw new Error("API request failed");
      }

      const data = await res.json();

      // ✅ Safe check
      if (data.results && data.results.length > 0) {
        return data.results[0].urls.regular;
      } else {
        return "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
      }
    } catch (err) {
      console.error("Image fetch error:", err);
      return "https://dummyimage.com/300x300/cccccc/000000&text=Error";
    }
  };

  // 🔥 Load images when flowers change
  useEffect(() => {
    const loadImages = async () => {
      let temp = {};

      for (let flower of flowers) {
        const cleanFlower = flower.split("(")[0].trim();

        const img = await fetchFlowerImage(cleanFlower);

        temp[flower] = img;
      }

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
        {flowers.map((flower, index) => {
          const cleanFlower = flower.split("(")[0].trim();

          return (
            <div
              key={index}
              className="backdrop-blur-md bg-white/40 border border-white/40 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <img
                src={
                  images[flower] ||
                  "https://dummyimage.com/300x300/cccccc/000000&text=Loading"
                }
                alt={cleanFlower}
                className="w-full h-40 object-cover rounded"
              />

              <h3 className="text-lg font-semibold text-pink-600 mt-3">
                {cleanFlower}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedBouquet;