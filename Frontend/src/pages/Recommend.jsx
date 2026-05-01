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

  // 🌸 STEP 1: FLOWERS + IMAGES
  const handleRecommend = async (data) => {
    try {
      setLoading(true);
      setFormData(data);

      const res = await fetch("http://localhost:5000/api/flowers/generate", {
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

      // 🌼 FETCH IMAGES HERE (ONLY ONCE)
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

      // 🔐 Save to DB (optional)
      try {
        const saved = await authFetch("/bouquets", {
          method: "POST",
          body: JSON.stringify({
            ...data,
            flowers: flowersWithImages,
          }),
        });

        setBouquetId(saved.bouquetId);
      } catch {
        console.warn("Not logged in → skipping DB save");
      }

    } catch (err) {
      console.error(err);
      alert("Failed to generate bouquet");
    } finally {
      setLoading(false);
    }
  };

  // 💌 SAVE MESSAGE
  const handleMessageSave = async (msg) => {
    setMessage(msg);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/message`, {
        method: "PUT",
        body: JSON.stringify({ message: msg }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 🎁 ADDONS
  const handleAddOnChange = async (newAddOns) => {
    setAddOns(newAddOns);

    if (!bouquetId) return;

    try {
      await authFetch(`/bouquets/${bouquetId}/addons`, {
        method: "PUT",
        body: JSON.stringify({ addOns: newAddOns }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  // 🚀 FINALIZE
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
      console.error(err);
      alert("Finalization failed");
    }
  };

  return (
    <div className="min-h-screen py-20 px-4 relative">

      <div className="relative z-10">
        <h1 className="text-3xl font-bold text-center mb-10">
          Get Your Perfect Bouquet 🌸
        </h1>

        <div className="max-w-xl mx-auto bg-white/30 p-6 rounded-3xl">
          <RecommendationForm onRecommend={handleRecommend} />
        </div>

        {loading && (
          <p className="text-center mt-6">Generating bouquet... 🌸</p>
        )}

        {flowers.length > 0 && !loading && (
          <div className="max-w-5xl mx-auto mt-12 space-y-10">

            <RecommendedBouquet flowers={flowers} />

            <AddonSelector addOns={addOns} setAddOns={handleAddOnChange} />

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

            <MessageGenerator
              flowers={flowers}
              addOns={addOns}
              style={style}
              setMessage={handleMessageSave}
              occasion={formdata.occasion}
              relationship={formdata.relationship}
              personality={formdata.personality}
            />

            <button
              onClick={handleFinalize}
              className="w-full bg-green-500 text-white py-3 rounded-xl"
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