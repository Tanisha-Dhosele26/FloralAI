import React, { useState } from "react";

const MessageGenerator = ({ flowers, setMessage, message }) => {
  const generateMessage = () => {
    if (!flowers.length) {
      setMessage("Please select bouquet first.");
      return;
    }

    if (flowers.includes("Rose")) {
      setMessage("You are my love and everything ❤️");
    } else if (flowers.includes("Daisy")) {
      setMessage("Stay bright and fresh like a daisy 🌼");
    } else if (flowers.includes("Lily")) {
      setMessage("Purity and elegance always shine ✨");
    } else {
      setMessage("Let love bloom beautifully 🌷");
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-4 text-rose-500">
        Generate Message 💌
      </h2>

      <button
        onClick={generateMessage}
        className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-full shadow transition"
      >
        Generate Message
      </button>

      {message && (
        <p className="mt-4 bg-white/50 backdrop-blur-md p-4 rounded-xl shadow">
          {message}
        </p>
      )}
    </div>
  );
};

export default MessageGenerator;
