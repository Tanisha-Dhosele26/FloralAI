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

      const msgs = response?.data?.messages;

      if (!msgs?.length) {
        throw new Error("No messages returned");
      }

      setMessages(msgs);

      setSelectedMessage(msgs[0]);
      setMessage(msgs[0]);

    } catch (err) {
      const fallback = [
        "💐 Wishing you happiness and love!",
        "🌸 May your day bloom with joy!",
        "✨ Sending beautiful floral vibes!",
      ];

      setMessages(fallback);
      setSelectedMessage(fallback[0]);
      setMessage(fallback[0]);

      setError("");
    } finally {
      setLoading(false);
    }
  };

  const handleSelect = (msg) => {
    setSelectedMessage(msg);
    setMessage(msg);
  };

  return (
    <div className="text-center">

      <h2 className="text-xl font-bold mb-4 text-rose-500">
        Generate Message 💌
      </h2>

      <button
        onClick={generateMessage}
        disabled={loading}
        className={`px-6 py-2 rounded-full text-white transition ${
          loading
            ? "bg-gray-400"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Messages"}
      </button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {messages.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-semibold text-gray-700">
            Choose Your Message 💬
          </h3>

          {messages.map((msg, i) => (
            <div
              key={i}
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

      {selectedMessage && (
        <p className="mt-6 bg-white/50 p-4 rounded-xl italic">
          "{selectedMessage}"
        </p>
      )}
    </div>
  );
};

export default MessageGenerator;