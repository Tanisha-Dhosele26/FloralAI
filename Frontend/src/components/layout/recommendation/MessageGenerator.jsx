import React, { useState } from "react";
import axios from "axios";

const MessageGenerator = ({
  flowers,
  addOns,
  style,
  setMessage,
  occasion,
  relationship,
  personality,
}) => {
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");
  const [error, setError] = useState("");

  // 💌 GENERATE MESSAGE
  const generateMessage = async () => {
    try {
      if (!flowers || flowers.length === 0) {
        setError("Please generate bouquet first 🌸");
        return;
      }

      setLoading(true);
      setError("");
      setMessages([]);
      setSelectedMessage("");

      // ✅ IMPORTANT FIX → send ONLY flower names
      const flowerNames = flowers.map((f) => f.name);

      const response = await axios.post(
        "http://localhost:5000/api/message/generate",
        {
          flowers: flowerNames,
          addOns: addOns || [],
          style,
          occasion,
          relationship,
          personality,
        }
      );

      console.log("💌 API RESPONSE:", response.data);

      const msgs = response?.data?.messages;

      if (!msgs || !Array.isArray(msgs) || msgs.length === 0) {
        throw new Error("Invalid messages from API");
      }

      setMessages(msgs);

      // ✅ Auto-select first message (better UX)
      setSelectedMessage(msgs[0]);
      setMessage(msgs[0]);

    } catch (err) {
      console.error("❌ Message generation failed:", err.message);

      // ✅ FALLBACK (VERY IMPORTANT)
      const fallbackMessages = [
        "💐 Wishing you happiness and beautiful moments!",
        "🌸 May your day be filled with love and smiles!",
        "✨ Sending warmth, joy, and heartfelt wishes!",
      ];

      setMessages(fallbackMessages);
      setSelectedMessage(fallbackMessages[0]);
      setMessage(fallbackMessages[0]);

      setError(""); // handled gracefully
    } finally {
      setLoading(false);
    }
  };

  // ✅ USER SELECT MESSAGE
  const handleSelect = (msg) => {
    setSelectedMessage(msg);
    setMessage(msg);
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 text-rose-500">
        Generate Message 💌
      </h2>

      {/* 🔘 BUTTON */}
      <button
        onClick={generateMessage}
        disabled={loading}
        className={`px-6 py-2 rounded-full shadow text-white transition ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Messages"}
      </button>

      {/* ❌ ERROR */}
      {error && (
        <p className="mt-4 text-red-500">{error}</p>
      )}

      {/* 💌 MESSAGES */}
      {messages.length > 0 && !loading && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-700">
            Choose Your Message 💬
          </h3>

          {messages.map((msg, index) => (
            <div
              key={index}
              onClick={() => handleSelect(msg)}
              className={`cursor-pointer p-3 rounded-xl border transition ${
                selectedMessage === msg
                  ? "bg-pink-200 border-pink-400"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {msg}
            </div>
          ))}
        </div>
      )}

      {/* ✅ PREVIEW */}
      {selectedMessage && (
        <p className="mt-6 bg-white/50 p-4 rounded-xl shadow italic">
          "{selectedMessage}"
        </p>
      )}
    </div>
  );
};

export default MessageGenerator;