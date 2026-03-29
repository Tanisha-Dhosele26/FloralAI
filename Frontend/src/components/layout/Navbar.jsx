import React, { useState } from "react";
import { Link } from "react-router-dom";

// MUI Icons
import HomeIcon from "@mui/icons-material/Home";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const user = JSON.parse(localStorage.getItem("user")) || null;

  return (
    <nav className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/30 border-b border-white/40 shadow-md">
      
      <div className="flex items-center justify-between p-4 max-w-7xl mx-auto">

        {/* Logo */}
        <h1 className="text-2xl font-bold text-pink-600">
          FloralAI 🌸
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-gray-700 font-medium">

          <li className="hover:text-pink-500 transition flex items-center gap-1">
            <Link to="/" className="flex items-center gap-1">
              <HomeIcon fontSize="small" /> Home
            </Link>
          </li>

          <li className="hover:text-pink-500 transition flex items-center gap-1">
            <Link to="/recommend" className="flex items-center gap-1">
              <AutoAwesomeIcon fontSize="small" /> Recommendation
            </Link>
          </li>

          <li className="hover:text-pink-500 transition flex items-center gap-1">
            <Link to="/encyclopedia" className="flex items-center gap-1">
              <MenuBookIcon fontSize="small" /> Encyclopedia
            </Link>
          </li>

          <li className="hover:text-pink-500 transition flex items-center gap-1">
            <Link to="/orderSummary" className="flex items-center gap-1">
              <ShoppingCartIcon fontSize="small" /> Order
            </Link>
          </li>

          {user ? (
            <li className="hover:text-pink-500">
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <>
              <li className="hover:text-pink-500">
                <Link to="/login">Login</Link>
              </li>
              <li className="hover:text-pink-500">
                <Link to="/signup">Signup</Link>
              </li>
            </>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/40 backdrop-blur-md px-6 py-4 space-y-4">

          <Link to="/" onClick={() => setIsOpen(false)} className="flex gap-2">
            <HomeIcon /> Home
          </Link>

          <Link to="/recommend" onClick={() => setIsOpen(false)} className="flex gap-2">
            <AutoAwesomeIcon /> Recommendation
          </Link>

          <Link to="/encyclopedia" onClick={() => setIsOpen(false)} className="flex gap-2">
            <MenuBookIcon /> Encyclopedia
          </Link>

          <Link to="/orderSummary" onClick={() => setIsOpen(false)} className="flex gap-2">
            <ShoppingCartIcon /> Order
          </Link>

          {user ? (
            <Link to="/profile" onClick={() => setIsOpen(false)}>
              Profile
            </Link>
          ) : (
            <>
              <Link to="/login" onClick={() => setIsOpen(false)}>
                Login
              </Link>
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                Signup
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;