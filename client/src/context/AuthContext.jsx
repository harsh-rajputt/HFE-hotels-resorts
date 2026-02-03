import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

    useEffect(() => {
        // Sync state with localStorage on mount (and if storage changes)
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('username');

        if (storedToken) {
            setToken(storedToken);
            setIsAuthenticated(true);
            setUser({ username: storedUser });
        }
    }, []);

    const login = (userData, newToken) => {
        setUser(userData);
        setToken(newToken);
        setIsAuthenticated(true);
        localStorage.setItem('token', newToken);
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('username', userData.username);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        setIsAuthenticated(false);
        localStorage.removeItem('token');
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('username');
    };

    return (
        <AuthContext.Provider value={{ user, token, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
