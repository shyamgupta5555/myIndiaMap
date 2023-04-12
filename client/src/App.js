import { useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Map } from "./component/map";
import { SignUp } from "./component/signup";
import { Home } from "./component/home";
import { Navbar } from "./component/navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<Map />} />
      </Routes>
    </>
  );
}

export default App;
