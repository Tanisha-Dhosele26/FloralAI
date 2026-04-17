import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Home from "./pages/Home";
import Recommend from "./pages/Recommend";
import Footer from "./components/layout/Footer";

import Encyclopedia from "./pages/Encyclopedia";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import BouquetResult from "./pages/bouquetResult";


const App = () => {
  return (
    <>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recommend" element={<Recommend />} />
          <Route path="/encyclopedia" element={<Encyclopedia />} />
          <Route path= "/bouquetResult" element={<BouquetResult/>} />
          <Route path= "/login" element={<Login/>} />
          <Route path= "/signup" element={<Signup/>} />
          <Route path= "/profile" element={<Profile/>} />
        </Routes>
       
    </>
  );
};

export default App;
