import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMe } from '../api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('hire_token'));
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            if (token) {
                try {
                    const res = await getMe();
                    setUser(res.data);
                } catch {
                    localStorage.removeItem('hire_token');
                    localStorage.removeItem('hire_user');
                    setToken(null);
                }
            }
            setLoading(false);
        };
        loadUser();
    }, [token]);

    const loginUser = (tokenVal, userData) => {
        localStorage.setItem('hire_token', tokenVal);
        localStorage.setItem('hire_user', JSON.stringify(userData));
        setToken(tokenVal);
        setUser(userData);
    };

    const logoutUser = () => {
        localStorage.removeItem('hire_token');
        localStorage.removeItem('hire_user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, loading, loginUser, logoutUser, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
