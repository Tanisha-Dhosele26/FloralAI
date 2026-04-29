import React, { useState } from "react";
import RecommendationForm from "../components/layout/recommendation/RecommendationForm";
import RecommendedBouquet from "../components/layout/recommendation/RecommendedBouquet";
import AddonSelector from "../components/layout/recommendation/AddonSelector";
import MessageGenerator from "../components/layout/recommendation/MessageGenerator";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api"; // ✅ IMPORT

const Recommend = () => {
  const [flowers, setFlowers] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("Romantic");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});
  const [bouquetId, setBouquetId] = useState(null);

  const navigate = useNavigate();

  // 🔥 STEP 1: GENERATE FLOWERS + SAVE
  const handleRecommend = async (data) => {
    try {
      setFormData(data);
      setLoading(true);

      // 🌐 CALL GEMINI (no auth needed)
      const response = await fetch("http://localhost:5000/api/message/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("API request failed");

      const result = await response.json();

      // 🌸 PARSE FLOWERS
      const aiFlowers = result.message
        .replace(/\n/g, "")
        .replace(/Flowers:/gi, "")
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      const formattedFlowers = aiFlowers.map((f) => ({
        name: f,
        image: "https://picsum.photos/150", // ✅ better placeholder
      }));

      setFlowers(formattedFlowers);

      // 💾 SAVE TO DB (uses authFetch)
      const saved = await authFetch("/bouquets", {
        method: "POST",
        body: JSON.stringify({
          ...data,
          flowers: formattedFlowers,
        }),
      });

      setBouquetId(saved.bouquetId);

    } catch (error) {
      console.error("❌ ERROR:", error.message);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 STEP 2: ADD-ONS
  const handleAddOnChange = async (newAddOns) => {
    setAddOns(newAddOns);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/addons`, {
        method: "PUT",
        body: JSON.stringify({ addOns: newAddOns }),
      });

      console.log("🎁 ADD-ONS UPDATED");
    } catch (err) {
      console.error("❌ Add-ons update failed:", err.message);
    }
  };

  // 🔥 STEP 3: MESSAGE
  const handleMessageSave = async (msg) => {
    setMessage(msg);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/message`, {
        method: "PUT",
        body: JSON.stringify({ message: msg }),
      });

      console.log("💌 MESSAGE SAVED");
    } catch (err) {
      console.error("❌ Message save failed:", err.message);
    }
  };

  // 🔥 STEP 4: FINALIZE
  const handleFinalize = async () => {
    if (!message) {
      alert("Please generate message first!");
      return;
    }

    if (!bouquetId) {
      alert("Bouquet not saved properly!");
      return;
    }

    try {
      await authFetch(`/bouquets/${bouquetId}/finalize`, {
        method: "PUT",
        body: JSON.stringify({
          digitalBouquetUrl: "generated-url-here",
        }),
      });

      console.log("🎉 BOUQUET FINALIZED");

      navigate("/bouquetResult", {
        state: { flowers, addOns, message, style },
      });

    } catch (err) {
      console.error("❌ Finalization failed:", err.message);
      alert(err.message);
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

            {/* 🌸 Bouquet */}
            <RecommendedBouquet flowers={flowers} />

            <AddonSelector addOns={addOns} setAddOns={handleAddOnChange} />

            {/* STYLE */}
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

            {/* 💌 MESSAGE GENERATOR */}
            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}
              message={message}
              setMessage={handleMessageSave}
              occasion={formdata.occasion}
              relationship={formdata.relationship}
              personality={formdata.personality}
            />

            {/* 🚀 NAVIGATION */}
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
