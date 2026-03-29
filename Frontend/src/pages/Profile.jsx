import { useNavigate } from "react-router-dom";
import  { useState } from "react";
const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };
  return (
    <>
      <div className="p-8 text-center">
        <h1 className="text-3xl font-bold mb04">User Profile</h1>
        {user ? (
          <>
            <p className="text-lg">Name : {user.name || "User"}</p>
            <p className="text-lg">Email : {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-6 bg-red-500 text-white px-6 py-2 rounded"
            >
              Logout
            </button>
          </>
        ) : (
          <p>No user logged</p>
        )}
      </div>
    </>
  );
};

export default Profile;
