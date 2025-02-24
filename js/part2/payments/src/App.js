import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Checkout from "./Checkout";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />
        <Route path="/success" element={<h2>Payment Successful</h2>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
