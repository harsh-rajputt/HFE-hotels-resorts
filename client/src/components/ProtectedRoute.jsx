import React, { useEffect, useState } from 'react';

// Use a simpler approach for now directly in the component or via a wrapper
// Since we are using basic localStorage auth logic in Login.jsx

export default function ProtectedRoute({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = localStorage.getItem('isAuthenticated');
        if (auth === 'true') {
            setIsAuthenticated(true);
        } else {
            // Redirect to login if not authenticated
            window.location.href = '/login';
        }
        setLoading(false);
    }, []);

    if (loading) return null; // Or a loading spinner

    return isAuthenticated ? children : null;
}
