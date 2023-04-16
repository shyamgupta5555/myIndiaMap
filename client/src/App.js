import { useState, useEffect } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { Map } from "./component/map";
import { SignUp } from "./component/signup";
import { Home } from "./component/home";

import { Boxx } from "./component/Box";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/map" element={<Map />} />
        <Route path="/profile" element={<Boxx />} />
      </Routes>
    </>
  );
}

export default App;
