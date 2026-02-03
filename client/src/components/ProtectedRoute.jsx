import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children }) {
    const { isAuthenticated } = useAuth();

    // We can add a loading state here if we were checking auth asynchronously via API
    // But since we sync from localStorage on mount in context, it's pretty instant.
    // If we wanted to be stricter, we'd wait for a 'loading' flag from context.

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}
