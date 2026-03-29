import React from "react";

const AddonSelector = ({ addOns, setAddOns }) => {
  const items = [
    {
      name: "Chocolate",
      image:
        "https://images.unsplash.com/photo-1687795097254-f019f9d7fd17?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    { name: "Teddy", image: "https://plus.unsplash.com/premium_photo-1725075087077-4a904603f416?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
    { name: "Cards", image: "https://plus.unsplash.com/premium_photo-1703369347637-c908ce3bc5bf?q=80&w=1173&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" },
  ];

  const handleToggle = (item) => {
    if (addOns.includes(item)) {
      setAddOns(addOns.filter((a) => a !== item));
    } else {
      setAddOns([...addOns, item]);
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-xl font-bold mb-6 text-gray-700">Add Gifts 🎁</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item) => (
          <div
            key={item.name}
            onClick={() => handleToggle(item.name)}
            className={`cursor-pointer rounded-2xl overflow-hidden shadow-lg border transition 
              ${
                addOns.includes(item.name)
                  ? "ring-2 ring-pink-500"
                  : "hover:scale-105"
              }
            `}
          >
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover" />
            {item.name}
          </div>
        ))}
      </div>
    </div>
  );
};
export default AddonSelector;
