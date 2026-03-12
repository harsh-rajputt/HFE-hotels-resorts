import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/AuthContext';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Shimla from './pages/Shimla';
import Rishikesh from './pages/Rishikesh';
import Ranikhet from './pages/Ranikhet';
import Gallery from './pages/Gallery';
import Login from './pages/Login';
import UserAuth from './pages/UserAuth';
import RoomsList from './pages/RoomsList';
import RoomDetail from './pages/RoomDetail';
import UserDashboard from './pages/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="antialiased">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/user-auth" element={<UserAuth />} />
            <Route path="/rooms" element={<RoomsList />} />
            <Route path="/rooms/:id" element={<RoomDetail />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
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
    </AuthProvider>
  );
}

export default App;

