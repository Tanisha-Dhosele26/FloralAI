import React, { useState } from "react";
import RecommendationForm from "../components/layout/recommendation/RecommendationForm";
import RecommendedBouquet from "../components/layout/recommendation/RecommendedBouquet";
import AddonSelector from "../components/layout/recommendation/AddonSelector";
import MessageGenerator from "../components/layout/recommendation/MessageGenerator";
import { useNavigate } from "react-router-dom";
import { authFetch } from "../utils/api";

const Recommend = () => {
  const [flowers, setFlowers] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [message, setMessage] = useState("");
  const [style, setStyle] = useState("Romantic");
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({});
  const [bouquetId, setBouquetId] = useState(null);

  const navigate = useNavigate();

  // 🌸 STEP 1: GENERATE FLOWERS
  const handleRecommend = async (data) => {
  try {
    console.log("🟡 STEP 1: Function triggered");
    console.log("📥 Incoming form data:", data);

    setLoading(true);
    setFormData(data);

    console.log("🌐 Calling /api/flowers/generate...");

    const res = await fetch("http://localhost:5000/api/flowers/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    console.log("📡 Raw response status:", res.status);

    const result = await res.json();
    console.log("🌸 FINAL FLOWERS:", result.flowers);


    console.log("📦 API RESULT:", result);

    if (!result?.flowers) {
      console.error("❌ No flowers in response:", result);
      throw new Error("No flowers received from API");
    }

    console.log("🌸 Flowers received:", result.flowers);

    const formattedFlowers = result.flowers.map((f) => ({
      name: f,
      image: "https://picsum.photos/150",
    }));

    console.log("🎨 Formatted flowers:", formattedFlowers);

    setFlowers(formattedFlowers);

    console.log("💾 Saving bouquet to DB...");

    const saved = await authFetch("/bouquets", {
      method: "POST",
      body: JSON.stringify({
        ...data,
        flowers: formattedFlowers,
      }),
    });

    console.log("✅ Bouquet saved response:", saved);

    setBouquetId(saved.bouquetId);

    console.log("🆔 Bouquet ID set:", saved.bouquetId);

  } catch (err) {
    console.error("❌ Flower generation failed:", err);
    alert("Failed to generate bouquet");
  } finally {
    console.log("🟢 STEP END: Loading false");
    setLoading(false);
  }
};


  // 💌 STEP 2: SAVE MESSAGE
  const handleMessageSave = async (msg) => {
    try {
      setMessage(msg);

      if (!bouquetId) return;

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
    if (!bouquetId) return alert("Bouquet not saved");
    if (!message) return alert("Generate message first");

    try {
      await authFetch(`/bouquets/${bouquetId}/finalize`, {
        method: "PUT",
        body: JSON.stringify({
          digitalBouquetUrl: "generated-url-here",
        }),
      });

      navigate("/bouquetResult", {
        state: { flowers, addOns, message, style },
      });

    } catch (err) {
      console.error("❌ Finalize failed:", err.message);
      alert("Finalization failed");
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 bg-cover bg-center relative"
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

            <RecommendedBouquet flowers={flowers} />

            <AddonSelector
              addOns={addOns}
              setAddOns={handleAddOnChange}
            />

            {/* STYLE */}
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

            {/* MESSAGE */}
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

            {/* FINAL BUTTON */}
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
