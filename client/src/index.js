import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import { Home } from "./component/home";
import { SignUp } from "./component/signup";
import "./index.css";
import { Map } from "./component/map1";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <Routes>

   
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes>
  </BrowserRouter>
);
