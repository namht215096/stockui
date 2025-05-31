import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Candoikt from './pages/Candoiketoan';
import Headerr from './components/Headerr';
import Kqkd from './pages/Kqkd';
import Luanchuyentien from './pages/Luanchuyentien';
import Khoiluonggd from './pages/Khoiluonggd';

export default function App() {
  return (
    <BrowserRouter>
      <Headerr />
      <Routes>
        <Route path="/" element={<div>Trang chủ</div>} />
        <Route path="/candoikt" element={<Candoikt />} />
        <Route path="/kqkd" element={<Kqkd />} />
        <Route path="/Khoiluonggd" element={<Khoiluonggd/>} />
        <Route path="/luanchuyentien" element={<Luanchuyentien />} />
        {/* Các route khác nếu có */}
      </Routes>
    </BrowserRouter>
  );
}
