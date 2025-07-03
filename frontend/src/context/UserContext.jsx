import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    // Retrieve user from localStorage if available
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    // Function to update user data and store it in localStorage
    const updateUser = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData)); // Persist user
    };

    // Function to clear user data and remove from localStorage
    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user"); // Remove from storage on logout
    };

    return (
        <UserContext.Provider value={{ user, updateUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
