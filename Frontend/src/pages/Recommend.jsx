import React, { useState } from "react";
import RecommendationForm from "../components/layout/recommendation/RecommendationForm";
import RecommendedBouquet from "../components/layout/recommendation/RecommendedBouquet";
import AddonSelector from "../components/layout/recommendation/AddonSelector";
import MessageGenerator from "../components/layout/recommendation/MessageGenerator";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";

const UNSPLASH_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const Recommend = () => {
  const [flowers, setFlowers] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("Romantic");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});
  const [bouquetId, setBouquetId] = useState(null);

  const navigate = useNavigate();

  // 🌸 STEP 1: GENERATE FLOWERS + IMAGES
  const handleRecommend = async (data) => {
    try {
      console.log("🟡 STEP 1: Function triggered");
      setLoading(true);
      setFormData(data);

      // 🌸 Call backend (Gemini)
      const res = await fetch("http://localhost:5000/api/flowers/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      console.log("🌸 Flowers from API:", result);

      if (!result?.flowers) {
        throw new Error("No flowers received");
      }

      // 🌼 Fetch images from Unsplash
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
          } catch (err) {
            console.error("Image fetch failed:", err);
            return {
              name: flower,
              image:
                "https://dummyimage.com/300x300/cccccc/000000&text=Error",
            };
          }
        })
      );

      console.log("🎨 Final flowers:", flowersWithImages);

      setFlowers(flowersWithImages);

      // 🔐 OPTIONAL: Save to DB (only if logged in)
      try {
        const saved = await authFetch("/bouquets", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            flowers: flowersWithImages,
          }),
        });

        console.log("✅ Bouquet saved:", saved);
        setBouquetId(saved.bouquetId);
      } catch (err) {
        console.warn("⚠️ Not logged in → skipping DB save");
      }

    } catch (err) {
      console.error("❌ Error:", err.message);
      alert("Failed to generate bouquet");
    } finally {
      setLoading(false);
    }
  };

  // 💌 STEP 2: SAVE MESSAGE
  const handleMessageSave = async (msg) => {
    setMessage(msg);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/message`, {
        method: "PUT",
        body: JSON.stringify({ message: msg }),
      });

      console.log("💌 Message saved");
    } catch (err) {
      console.error("❌ Message save failed:", err.message);
    }
  };

  // 🎁 STEP 3: ADD-ONS
  const handleAddOnChange = async (newAddOns) => {
    setAddOns(newAddOns);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/addons`, {
        method: "PUT",
        body: JSON.stringify({ addOns: newAddOns }),
      });

      console.log("🎁 Add-ons updated");
    } catch (err) {
      console.error("❌ Add-ons update failed:", err.message);
    }
  };

  // 🚀 STEP 4: FINALIZE
  const handleFinalize = async () => {
    if (!message) {
      alert("Please select a message first!");
      return;
    }

    try {
      if (bouquetId) {
        await authFetch(`/bouquets/${bouquetId}/finalize`, {
          method: "PUT",
          body: JSON.stringify({
            digitalBouquetUrl: "generated-url",
          }),
        });
      }

      navigate("/bouquetResult", {
        state: { flowers, addOns, message, style },
      });

    } catch (err) {
      console.error("❌ Finalize failed:", err.message);
      alert("Finalization failed");
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
          Get Your Perfect Bouquet 🌸
        </h1>

        {/* FORM */}
        <div className="max-w-xl mx-auto bg-white/30 backdrop-blur-md border rounded-3xl p-6 shadow-xl">
          <RecommendationForm onRecommend={handleRecommend} />
        </div>

        {/* LOADING */}
        {loading && (
          <p className="text-center mt-6 text-gray-600">
            Generating bouquet... 🌸
          </p>
        )}

        {/* RESULT */}
        {flowers.length > 0 && !loading && (
          <div className="max-w-5xl mx-auto mt-12 space-y-10">

            {/* 🌸 Bouquet */}
            <RecommendedBouquet flowers={flowers} />

            {/* 🎁 Add-ons */}
            <AddonSelector
              addOns={addOns}
              setAddOns={handleAddOnChange}
            />

            {/* 🎨 STYLE */}
            <div className="text-center">
              <h2 className="text-lg font-semibold mb-2">
                Message Style 🎨
              </h2>

              <select
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                className="px-4 py-2 border rounded-lg shadow"
              >
                <option value="Romantic">Romantic ❤️</option>
                <option value="Friendly">Friendly 😊</option>
                <option value="Formal">Formal 🎩</option>
              </select>
            </div>

            {/* 💌 MESSAGE */}
            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}
              setMessage={handleMessageSave}
              occasion={formdata.occasion}
              relationship={formdata.relationship}
              personality={formdata.personality}
            />

            {/* 🚀 FINAL BUTTON */}
            <button
              onClick={handleFinalize}
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