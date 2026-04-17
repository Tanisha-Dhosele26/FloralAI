
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const BouquetResult = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { flowers = [], addOns = [], message = "", style = "" } =
    location.state || {};

  // Flower Image Mapping
  const flowerImages = {
    Rose: "https://images.unsplash.com/photo-1530906622963-8a60586a49c7?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Daisy: "https://plus.unsplash.com/premium_photo-1668379581576-a1af25f92810?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Tulip: "https://images.unsplash.com/photo-1586968295564-92fd7572718b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Lily: "https://images.unsplash.com/photo-1685307298280-a6655309a0bf?q=80&w=706&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Sunflower: "https://plus.unsplash.com/premium_photo-1676692121474-a3e3890d39f4?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  // Add-on Icons
  const addonImages = {
    Chocolate: "https://plus.unsplash.com/premium_photo-1667031518595-9cb4b0d504ef?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Teddy: "https://plus.unsplash.com/premium_photo-1725075087109-5ee07f242436?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    Card: "https://images.unsplash.com/photo-1614991711936-628079f824c3?q=80&w=1244&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-200 to-purple-200 flex flex-col items-center p-9">

      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-rose-600 mb-6 text-center p-10">
        Your Personalized Bouquet 
      </h1>

      {/*  Bouquet Card */}
      <div className="bg-white/30 backdrop-blur-lg border border-white/40 rounded-3xl shadow-xl p-6 w-full max-w-2xl text-center">

        {/* Flowers */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {flowers.map((flower, index) => (
            <div key={index} className="flex flex-col items-center">
              <img
                src={flowerImages[flower]}
                alt={flower}
                className="w-20 h-20 object-cover rounded-full shadow-md"
              />
              <p className="text-sm mt-2 font-medium">{flower}</p>
            </div>
          ))}
        </div>

        {/*  Message */}
        <div className="bg-white/60 p-4 rounded-xl shadow-inner mb-6">
          <h2 className="text-lg font-semibold text-rose-500 mb-2">
            Message 💌
          </h2>
          <p className="text-gray-700 text-sm md:text-base">
            {message || "Your beautiful message will appear here..."}
          </p>
        </div>

        {/*  Add-ons */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-rose-500 mb-3">
            Add-ons 🎁
          </h2>
          <div className="flex justify-center gap-6 flex-wrap">
            {addOns.length > 0 ? (
              addOns.map((item, index) => (
                <div key={index} className="flex flex-col items-center">
                  <img
                    src={addonImages[item]}
                    alt={item}
                    className="w-12 h-12"
                  />
                  <p className="text-sm">{item}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-sm">
                No add-ons selected
              </p>
            )}
          </div>
        </div>

       
      </div>

      {/*  Back Button */}
      <button
        onClick={() => navigate("/recommend")}
        className="mt-6 text-sm text-gray-700 underline"
      >
        ← Create Another Bouquet
      </button>
    </div>
  );
};

export default BouquetResult;