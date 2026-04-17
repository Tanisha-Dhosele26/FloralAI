import React from "react";
import axios from "axios";

const MessageGenerator = ({ flowers, addOns, setMessage, message }) => {

  const generateMessage = async () => {
    try {
      if (!flowers.length) {
        setMessage("Please select bouquet first.");
        return;
      }

      const response = await axios.post(
        "http://localhost:5000/api/message/generate",
        {
          flowers,
          addOns,
          style, 
        }
      );

      setMessage(response.data.message);

    } catch (error) {
      console.error(error);
      setMessage("Failed to generate AI message");
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