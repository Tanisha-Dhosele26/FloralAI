import React, { useState } from "react";
import axios from "axios";

const MessageGenerator = ({
  flowers,
  addOns,
  style,
  setMessage,
  message,
  occasion,
  relationship,
  personality,
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateMessage = async () => {
    try {
      if (!flowers.length) {
        setMessage("Please select bouquet first.");
        return;
      }

      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/message/generate",
        {
          flowers,
          addOns: addOns || [], // ✅ SAFE FIX
          style,
          occasion,
          relationship,
          personality,
        }
      );

      setMessage(response.data.message);

    } catch (err) {
      console.error(err);
      setError("Server busy. Please try again 🔄");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 text-rose-500">
        Generate Message 💌
      </h2>

      <button
        onClick={generateMessage}
        disabled={loading}
        className={`px-6 py-2 rounded-full shadow transition text-white ${
          loading
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-purple-500 hover:bg-purple-600"
        }`}
      >
        {loading ? "Generating..." : "Generate Message"}
      </button>

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

      {message && !loading && (
        <p className="mt-4 bg-white/50 p-4 rounded-xl shadow">
          {message}
        </p>
      )}
    </div>
  );
};

export default MessageGenerator;