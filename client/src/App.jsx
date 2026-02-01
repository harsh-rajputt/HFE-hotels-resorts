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

function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderPage = () => {
    // Normalize path to handle potential trailing slashes or case sensitivity if needed
    const path = currentPath.toLowerCase().replace(/\/$/, "");

    if (path === '/admin') return <ProtectedRoute><Admin /></ProtectedRoute>;
    if (path === '/login') return <Login />;
    if (path === '/shimla') return <Shimla />;
    if (path === '/rishikesh') return <Rishikesh />;
    if (path === '/ranikhet') return <Ranikhet />;
    if (path === '/gallery') return <Gallery />;
    return <Home />;
  };

  return (
    <div className="antialiased">
      {renderPage()}
      <FloatingWhatsApp />
    </div>
  )
}

export default App
