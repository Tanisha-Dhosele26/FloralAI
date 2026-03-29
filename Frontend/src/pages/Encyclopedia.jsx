import React, { useState } from "react";
import FlowerDetailsModal from "../components/layout/FlowerDetailsModal";

const flowersData = [
  {
    id: 1,
    name: "Rose",
    meaning: "Love & Passion",
    description: "Roses are symbols of deep love and romance.",
    image:
      "https://images.unsplash.com/photo-1729864432143-2d91aa3736aa?q=80&w=735&auto=format&fit=crop",
  },
  {
    id: 2,
    name: "Lily",
    meaning: "Purity",
    description: "Lilies represent purity and refined beauty.",
    image:
      "https://images.unsplash.com/photo-1639835170868-d43a19bbd180?q=80&w=1191&auto=format&fit=crop",
  },
  {
    id: 3,
    name: "Tulip",
    meaning: "Perfect Love",
    description: "Tulips symbolize perfect and deep love.",
    image:
      "https://plus.unsplash.com/premium_photo-1671974490018-813bcb0d6635?q=80&w=1220&auto=format&fit=crop",
  },
  {
    id: 4,
    name: "Daisy",
    meaning: "Innocence",
    description: "Daisies represent innocence and purity.",
    image:
      "https://images.unsplash.com/photo-1686298804691-c7df01a856ef?q=80&w=1170&auto=format&fit=crop",
  },
];

const Encyclopedia = () => {
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [search, setSearch] = useState("");

  // 🔍 Filter logic
  const filteredFlowers = flowersData.filter((flower) =>
    flower.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div
      className="min-h-screen py-20 px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1525262878081-819667390b23?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-white/20 backdrop-blur-md"></div>

      {/* Heading */}

      <div className="relative z-10">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-700">
          Flower Encyclopedia 🌸
        </h1>

        {/* 🔍 Search Bar */}
        <div className="max-w-md mx-auto mb-12">
          <input
            type="text"
            placeholder="Search flowers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-5 py-3 rounded-full border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-pink-300 backdrop-blur-lg bg-white/20 placeholder-gray-600"
          />
        </div>

        {/* 🌸 Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {filteredFlowers.map((flower) => (
            <div
              key={flower.id}
              onClick={() => setSelectedFlower(flower)}
              className="cursor-pointer backdrop-blur-lg bg-white/20 border border-white/30 rounded-2xl shadow-xl overflow-hidden transition hover:shadow-pink-300 hover:-translate-y-2"
            >
              {/* Image */}
              <img
                src={flower.image}
                alt={flower.name}
                className="w-full h-40 object-cover transition duration-500 hover:scale-110"
              />

              {/* Content */}
              <div className="p-4 text-center">
                <h3 className="text-xl font-bold text-pink-600">
                  {flower.name}
                </h3>

                <p className="text-sm text-gray-700 mt-2 opacity-80">
                  {flower.meaning}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ❌ No Results */}
      {filteredFlowers.length === 0 && (
        <p className="text-center text-gray-500 mt-10">No flowers found 🌸</p>
      )}

      {/* 🌟 Modal */}
      {selectedFlower && (
        <FlowerDetailsModal
          flower={selectedFlower}
          onClose={() => setSelectedFlower(null)}
        />
      )}
    </div>
  );
};

export default Encyclopedia;
