import React, { useState } from "react";
import RecommendationForm from "../components/layout/recommendation/RecommendationForm";
import RecommendedBouquet from "../components/layout/recommendation/RecommendedBouquet";
import AddonSelector from "../components/layout/recommendation/AddonSelector";
import MessageGenerator from "../components/layout/recommendation/MessageGenerator";
import { useNavigate } from "react-router-dom";

const Recommend = () => {
  const [flowers, setFlowers] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [message, setMessage] = useState("");
  const [style, setStyle ] = useState("Romantic");


  const navigate = useNavigate();

  const handleRecommend = (data) => {
    const occasion = data.occasion.toLowerCase();

    if (occasion === "birthday") setFlowers(["Daisy"]);
    else if (occasion === "anniversary") setFlowers(["Rose"]);
    else if (occasion === "propose") setFlowers(["Tulip"]);
    else setFlowers(["Rose", "Lily"]);
  };

  return (
    <div
      className="min-h-screen py-20 px-4 bg-cover bg-center relative "
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1646451711039-6a97dc8dfb45?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
      }}
    >
      <div className="absolute inset-0 bg-white/60 backdrop-blur-sm"></div>
      <div className="relative z-10">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 text-gray-700">
        Get Your Perfect Bouquet
      </h1>

      {/* FORM */}
      <div className="max-w-xl mx-auto backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-3xl p-6">
        <RecommendationForm onRecommend={handleRecommend} />
      </div>

      {/* RESULT */}
      {flowers.length > 0 && (
        <div className="max-w-5xl mx-auto mt-12 space-y-10">
          <RecommendedBouquet flowers={flowers} />

          <AddonSelector addOns={addOns} setAddOns={setAddOns} />


          {/*  STYLE SELECTOR */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Select Message Style 🎨
              </h2>

              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="px-4 py-2 rounded-lg border shadow"
              >
                <option value="Romantic">Romantic </option>
                <option value="Friendly">Friendly </option>
                <option value="Formal">Formal </option>
              </select>
            </div>

            {/* 💌 MESSAGE GENERATOR */}
            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}   // ✅ 
              message={message}
              setMessage={setMessage}
            />

          {/* Navigate only after message generated */}
            <button
              onClick={() => {
                if (!message) {
                  alert("Please generate message first!");
                  return;
                }

                navigate("/bouquetResult", {
                  state: { flowers, addOns, message },
                });
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              View Bouquet 💐
            </button>
        </div>
      )}
      </div>
    </div>
  );
};

export default Recommend;
