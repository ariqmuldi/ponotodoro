import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => { 
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect( () => {
        const checkUserStatus = async () => {
            setLoading(true); // Start loading
            try {
                return user;
            } catch (error) {
                return { message: 'Null user ' + err, user : null, success: false };
            }
            finally {
                setLoading(false);
            }
        };

        checkUserStatus();
    }, []);

    useEffect(() => {
        if (user) {
            console.log('User has been updated in AuthContext:', user);
        } else {
            console.log('User is null.');
        }
    }, [user]);  // This will trigger whenever `user` changes

    const register = async (username, email, password) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_ADDRESS + "register", { username, email, password },
                { headers : { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                setUser(response.data.user);
            }
            return response.data;
        } catch (error) {
            return { message: 'Registration failed: ' + error, user : null, success: false };
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const login = async (email, password) => {
        setLoading(true); // Start loading
        try {
            const response = await axios.post(import.meta.env.VITE_BACKEND_ADDRESS + "login", { email, password }, { withCredentials: true },
                { headers : { 'Content-Type': 'application/json' } }
            );
            if (response.data.success) {
                setUser(response.data.user);
            }
            return response.data;
        } catch(err) {
            return { message: 'Login failed: ' + err, user : null, success: false };
        }
        finally {
            setLoading(false); // Stop loading
        }
    
    }

    const logout = async (clearNotes) => {
        setLoading(true);
        try {
            await axios.post(import.meta.env.VITE_BACKEND_ADDRESS + "logout", {}, { withCredentials: true });
            setUser(null);
            clearNotes();
        } catch(err) {
            return { message: 'Logout failed: ' + err, success: false }
        } finally {
            setLoading(false); // Stop loading
        }
    } 

    return (
        // Use the AuthContext.Provider to provide the authentication context to the rest of the app
        // Gives user, login, logout, loading in an object
        // {children} represents the components that will consume this context.
        <AuthContext.Provider value={{ user, register, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
