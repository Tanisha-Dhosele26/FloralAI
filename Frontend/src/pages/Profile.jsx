import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // ✅ Load user safely
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // 🔥 If not logged in → redirect
      navigate("/login");
    }
  }, []);
  
const handleLogout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  window.dispatchEvent(new Event("storage")); // 🔥 update navbar

  navigate("/login");
};

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      {user ? (
        <>
          <p className="text-lg">Name: {user.name || "User"}</p>
          <p className="text-lg">Email: {user.email}</p>

          <button
            onClick={handleLogout}
            className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;