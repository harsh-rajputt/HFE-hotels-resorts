import React, { useState, useEffect } from 'react'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Shimla from './pages/Shimla'
import Rishikesh from './pages/Rishikesh'
import Ranikhet from './pages/Ranikhet'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import FloatingWhatsApp from './components/FloatingWhatsApp'

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Shimla from './pages/Shimla';
import Rishikesh from './pages/Rishikesh';
import Ranikhet from './pages/Ranikhet';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <BrowserRouter>
      <div className="antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/login" element={<Login />} />
          <Route path="/shimla" element={<Shimla />} />
          <Route path="/rishikesh" element={<Rishikesh />} />
          <Route path="/ranikhet" element={<Ranikhet />} />
          <Route path="/gallery" element={<Gallery />} />
          {/* Fallback for unknown routes */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <FloatingWhatsApp />
      </div>
    </BrowserRouter>
  );
}

export default App;

