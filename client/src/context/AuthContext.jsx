import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(false);

    const register = async (username, email, password) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_ADDRESS + "register", { username, email, password },
                { headers : { 'Content-Type': 'application/json' } }
            );
            return response.data;
        } catch (error) {
            return { message: 'Registration failed ' + error, user : null, success: false };
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        // Use the AuthContext.Provider to provide the authentication context to the rest of the app
        // Gives user, login, logout, loading in an object
        // {children} represents the components that will consume this context.
        <AuthContext.Provider value={{ register }}>
            {children}
        </AuthContext.Provider>
    );

}
