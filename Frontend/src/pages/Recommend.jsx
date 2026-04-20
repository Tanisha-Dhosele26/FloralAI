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
  const [style, setStyle] = useState("Romantic");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});

  const navigate = useNavigate();

  // 🔥 AI FLOWER GENERATION
  const handleRecommend = async (data) => {
    try {
      setFormData(data);
      setLoading(true);

      const response = await fetch("http://localhost:5000/api/message/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          occasion: data.occasion,
          relationship: data.relationship,
          personality: data.personality,
        }),
      });

      const result = await response.json();

      // 🧠 CLEAN AI OUTPUT
      const aiFlowers = result.message
        .replace(/\n/g, "")
        .replace("Flowers:", "")
        .split(",")
        .map((f) => f.trim())
        .filter((f) => f.length > 0);

      setFlowers(aiFlowers);

    } catch (error) {
      console.error(error);
      alert("AI flower generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen py-20 px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1646451711039-6a97dc8dfb45?q=80&w=1074&auto=format&fit=crop')",
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

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6 text-lg text-gray-600">
            Generating bouquet... 🌸
          </p>
        )}

        {/* RESULT */}
        {flowers.length > 0 && !loading && (
          <div className="max-w-5xl mx-auto mt-12 space-y-10">

            <RecommendedBouquet flowers={flowers} />

            <AddonSelector addOns={addOns} setAddOns={setAddOns} />

            {/* 🎨 STYLE SELECTOR */}
            <div className="text-center">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Select Message Style 🎨
              </h2>

              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="px-4 py-2 rounded-lg border shadow"
              >
                <option value="Romantic">Romantic ❤️</option>
                <option value="Friendly">Friendly 😊</option>
                <option value="Formal">Formal 🎩</option>
              </select>
            </div>

            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}
              message={message}
              setMessage={setMessage}
              occasion={formdata.occasion}
              relationship={formdata.relationship}
              personality={formdata.personality}
            />

            <button
              onClick={() => {
                if (!message) {
                  alert("Please generate message first!");
                  return;
                }

                navigate("/bouquetResult", {
                  state: { flowers, addOns, message, style },
                });
              }}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white py-3 rounded-xl shadow-lg hover:scale-105 transition"
            >
              Create Digital Bouquet 💐
            </button>

          </div>
        )}
      </div>
    </div>
  );
};

export default Recommend;