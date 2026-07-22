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
        "https://floralai.onrender.com/api/message/generate",
        {
          flowers: flowerNames,
          addOns: addOns || [],
          style,
          occasion,
          relationship,
          personality,
        }
      );

      let msgs = response?.data?.messages;

      // 🌸 HANDLE STRING RESPONSE
      if (typeof msgs === "string") {
        msgs = msgs
          .split(/\d+\.\s/)
          .filter((msg) => msg.trim() !== "")
          .map((msg) => msg.trim());
      }

      if (!msgs?.length) {
        throw new Error("No messages returned");
      }

      setMessages(msgs);

      setSelectedMessage(msgs[0]);
      setMessage(msgs[0]);

    } catch (err) {
      console.log(err);

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
    <div className="text-center mt-10">

      {/* 🌸 TITLE */}
      <h2 className="text-3xl font-bold mb-6 text-pink-600">
        AI Message Generator 💌
      </h2>

      {/* BUTTON */}
      <button
        onClick={generateMessage}
        disabled={loading}
        className={`
          px-8 py-3 rounded-2xl text-white font-semibold shadow-lg
          transition-all duration-300
          hover:scale-105 hover:shadow-2xl
          ${
            loading
              ? "bg-gray-400"
              : "bg-gradient-to-r from-pink-500 to-rose-500"
          }
        `}
      >
        {loading ? "Generating Magic... ✨" : "Generate Messages 🌸"}
      </button>

      {/* ERROR */}
      {error && (
        <p className="mt-4 text-red-500 font-medium">
          {error}
        </p>
      )}

      {/* 🌸 MESSAGE CARDS */}
      {messages.length > 0 && (
        <div className="mt-10">

          <h3 className="font-semibold text-gray-700 text-xl mb-6">
            Choose Your Favorite Message 💬
          </h3>

          <div className="space-y-5">

            {messages.map((msg, i) => (
              <div
                key={i}
                onClick={() => handleSelect(msg)}
                className={`
                  relative overflow-hidden cursor-pointer
                  backdrop-blur-xl bg-white/60
                  border border-white/40
                  rounded-3xl p-6
                  shadow-lg
                  transition-all duration-300
                  hover:scale-[1.02]
                  hover:shadow-2xl
                  hover:-translate-y-1
                  group
                  ${
                    selectedMessage === msg
                      ? "ring-4 ring-pink-400 bg-pink-50/80"
                      : ""
                  }
                `}
              >

                {/* ✨ Glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-200/20 to-rose-200/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                {/* 💌 Quote */}
                <div className="absolute top-2 left-4 text-5xl text-pink-200 opacity-50">
                  ❝
                </div>

                {/* MESSAGE */}
                <p className="relative z-10 text-gray-700 italic text-lg leading-relaxed px-4">
                  {msg}
                </p>

                {/* 🌸 Footer */}
                <div className="mt-5 flex justify-end">
                  <span className="text-pink-400 text-2xl">
                    🌸
                  </span>
                </div>

              </div>
            ))}

          </div>
        </div>
      )}

      {/* 🌸 SELECTED MESSAGE */}
      {selectedMessage && (
        <div className="relative mt-10">

          {/* Glow */}
          <div className="absolute hover:scale-105 inset-0 bg-gradient-to-r from-pink-500 to-rose-500 blur-2xl rounded-3xl "></div>

          <div className="relative bg-white/50 backdrop-blur-xl  ring-4 ring-pink-500 rounded-3xl p-6 shadow-xl">

            <div className="absolute top-3 left-4 text-5xl text-pink-300 opacity-50">
              ❝
            </div>

            <p className="text-xl  italic text-gray-700 leading-relaxed px-6 hover:text-2xl hover:text-rose-400 py-4 rounded-lg">
              {selectedMessage}
            </p>

            <div className="flex justify-end mt-4 ">
              <span className="text-pink-400 text-2xl">
                💖
              </span>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default MessageGenerator;