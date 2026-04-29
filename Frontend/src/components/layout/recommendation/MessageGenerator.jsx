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
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedMessage, setSelectedMessage] = useState("");

  const generateMessage = async () => {
    try {
      if (!flowers.length) {
        setError("Please select bouquet first.");
        return;
      }

      setLoading(true);
      setError("");
      setMessages([]);
      setSelectedMessage("");

      const response = await axios.post(
        "http://localhost:5000/api/message/generate",
        {
          flowers,
          addOns: addOns || [],
          style,
          occasion,
          relationship,
          personality,
        }
      );

      console.log("💌 API RESPONSE:", response.data);

      const msgs = response?.data?.messages;

      // ✅ Validate response
      if (!msgs || !Array.isArray(msgs) || msgs.length === 0) {
        throw new Error("Empty messages from API");
      }

      setMessages(msgs);

    } catch (err) {
      console.error("❌ Message generation failed:", err.message);

      // ✅ FALLBACK MESSAGES
      const fallbackMessages = [
        "Wishing you happiness and joy with these beautiful flowers 🌸",
        "May these blooms brighten your day and bring a smile 😊",
        "A small bouquet filled with love, just for you 💐",
      ];

      setMessages(fallbackMessages);

      // auto-select first message
      setSelectedMessage(fallbackMessages[0]);
      setMessage(fallbackMessages[0]);

      setError(""); // clear error since we handled it
    } finally {
      setLoading(false);
    }
  };

  // ✅ When user selects message
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
        className={`px-6 py-2 rounded-full shadow transition text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Messages"}
      </button>

      {/* ❌ ERROR (only if no fallback triggered) */}
      {error && (
        <div className="mt-4">
          <p className="text-red-500">{error}</p>
          <button
            onClick={generateMessage}
            className="mt-2 bg-red-500 text-white px-4 py-1 rounded"
          >
            Retry 🔄
          </button>
        </div>
      )}

      {/* 💌 MESSAGE OPTIONS */}
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

      {/* ✅ SELECTED MESSAGE PREVIEW */}
      {selectedMessage && (
        <p className="mt-6 bg-white/50 p-4 rounded-xl shadow italic">
          "{selectedMessage}"
        </p>
      )}
    </div>
  );
};

export default MessageGenerator;
