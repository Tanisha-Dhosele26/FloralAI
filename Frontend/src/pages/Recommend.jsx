import React, { useState } from "react";
import RecommendationForm from "../components/layout/recommendation/RecommendationForm";
import RecommendedBouquet from "../components/layout/recommendation/RecommendedBouquet";
import AddonSelector from "../components/layout/recommendation/AddonSelector";
import MessageGenerator from "../components/layout/recommendation/MessageGenerator";
import { useNavigate } from "react-router-dom";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Recommend = () => {
  const [flowers, setFlowers] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("Romantic");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});

  const navigate = useNavigate();

  // 🌸 STEP 1: GENERATE FLOWERS
  const handleRecommend = async (data) => {
    try {
      setLoading(true);
      setFormData(data);

      const res = await fetch("https://floralai.onrender.com/api/flowers/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!result?.flowers) {
        throw new Error("No flowers received");
      }

      const flowersWithImages = await Promise.all(
        result.flowers.map(async (flower) => {
          try {
            const imgRes = await fetch(
              `https://api.unsplash.com/photos/random?query=${flower}&client_id=${UNSPLASH_KEY}`
            );

            const imgData = await imgRes.json();

            return {
              name: flower,
              image:
                imgData?.urls?.small ||
                "https://dummyimage.com/300x300/cccccc/000000&text=No+Image",
            };
          } catch {
            return {
              name: flower,
              image:
                "https://dummyimage.com/300x300/cccccc/000000&text=Error",
            };
          }
        })
      );

      setFlowers(flowersWithImages);
    } catch (err) {
      console.error(err);
      alert("Failed to generate bouquet");
    } finally {
      setLoading(false);
    }
  };

  // 💌 MESSAGE HANDLER
  const handleMessageSave = (msg) => {
    setMessage(msg);
  };

  // 🎁 ADD-ONS
  const handleAddOnChange = (newAddOns) => {
    setAddOns(newAddOns);
  };

  return (
    <div className="min-h-screen py-20 px-4 relative">

      <div className="relative z-10">

        <h1 className="text-3xl font-bold text-center mb-10">
          Get Your Perfect Bouquet 🌸
        </h1>

        {/* FORM */}
        <div className="max-w-xl mx-auto bg-white/30 p-6 rounded-3xl">
          <RecommendationForm onRecommend={handleRecommend} />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6">
            Generating bouquet... 🌸
          </p>
        )}

        {/* RESULTS */}
        {flowers.length > 0 && !loading && (
          <div className="max-w-5xl mx-auto mt-12 space-y-10">

            {/* PREVIEW */}
            <RecommendedBouquet flowers={flowers} />

            {/* ADD-ONS */}
            <AddonSelector
              addOns={addOns}
              setAddOns={handleAddOnChange}
            />

            {/* STYLE */}
            <div className="text-center">
              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="px-4 py-2 border rounded"
              >
                <option value="Romantic">Romantic ❤️</option>
                <option value="Friendly">Friendly 😊</option>
                <option value="Formal">Formal 🎩</option>
              </select>
            </div>

            {/* MESSAGE GENERATOR */}
            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}
              setMessage={handleMessageSave}
              occasion={formdata.occasion}
              relationship={formdata.relationship}
              personality={formdata.personality}
            />

            {/* CONTINUE BUTTON */}
            <div className="text-center mt-10">

              <button
                onClick={() => {
                  if (!message) {
                    alert("Please select a message first!");
                    return;
                  }

                  navigate("/cardDesign", {
                    state: {
                      flowers,
                      addOns,
                      message,
                      style,
                      occasion: formdata.occasion,
                      relationship: formdata.relationship,
                      personality: formdata.personality,
                    },
                  });
                }}
                className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl shadow-lg hover:scale-105 transition"
              >
                Create Bouquet Card 💐
              </button>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default Recommend;