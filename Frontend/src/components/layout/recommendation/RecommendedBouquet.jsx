import React, { useEffect, useState } from "react";

const RecommendedBouquet = ({ flowers }) => {
  const [images, setImages] = useState({});

  const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

  // 🔥 Fetch image from Unsplash
  const fetchFlowerImage = async (flowerName) => {
    try {
      if (!ACCESS_KEY) {
        return "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
      }

      const res = await fetch(
        `https://api.unsplash.com/search/photos?query=${flowerName}&client_id=${ACCESS_KEY}`
      );

      const data = await res.json();

      if (data.results?.length > 0) {
        return data.results[0].urls.regular;
      }

      return "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
    } catch (err) {
      console.error("❌ Image fetch error:", err);
      return "https://dummyimage.com/300x300/cccccc/000000&text=Error";
    }
  };

  // 🔥 Load images (parallel + fixed keys)
  useEffect(() => {
    const loadImages = async () => {
      try {
        const promises = flowers.map(async (flower) => {
          const cleanName = flower.name.split("(")[0].trim();

          const img = await fetchFlowerImage(cleanName);

          return { key: cleanName, img };
        });

        const results = await Promise.all(promises);

        const temp = {};
        results.forEach(({ key, img }) => {
          temp[key] = img;
        });

        console.log("🖼️ Loaded Images (temp):", temp);

        setImages(temp);
      } catch (err) {
        console.error("❌ Image loading failed:", err);
      }
    };

    if (flowers.length) loadImages();
  }, [flowers]);

  // 🔥 Log FINAL images state (this is what UI actually uses)
  useEffect(() => {
    console.log("🖼️ Loaded Images (state):", images);
  }, [images]);

  if (!flowers.length) return null;

  return (
    <div className="text-center">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">
        Recommended Bouquet 💐
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {flowers.map((flower, index) => {
          const cleanName = flower.name.split("(")[0].trim();

          return (
            <div
              key={index}
              className="backdrop-blur-md bg-white/40 border border-white/40 p-6 rounded-2xl shadow-lg hover:scale-105 transition"
            >
              <img
                src={
                  images[cleanName] ||
                  "https://dummyimage.com/300x300/eeeeee/000000&text=Loading..."
                }
                alt={cleanName}
                className="w-full h-40 object-cover rounded"
                onError={(e) => {
                  e.target.src =
                    "https://dummyimage.com/300x300/ffcccc/000000&text=Error";
                }}
              />

              <h3 className="text-lg font-semibold text-pink-600 mt-3">
                {cleanName}
              </h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedBouquet;
