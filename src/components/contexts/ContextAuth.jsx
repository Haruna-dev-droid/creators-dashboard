import React from "react";
import { createContext, useContext, useState, useEffect } from "react";
const ContextAuth = createContext(null);
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUsers = localStorage.getItem("creators_users");
    const storedAuth = localStorage.getItem("creators_auth");

    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    }

    if (storedAuth) {
      const authData = JSON.parse(storedAuth);
      setCurrentUser(authData.user);
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      localStorage.setItem("creators_users", JSON.stringify(users));
    }
  }, [users]);

  const signUp = async (name, email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Checking if user with thesame email exists.
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
          reject(
            new Error(
              "An account with this email already exists. Please log in.",
            ),
          );
          return;
        }

        // CREATE NEW USER
        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          createdAt: new Date().toISOString(),
        };

        setUsers((prev) => [...prev, newUser]);

        // AUTOMATIC LOGIN AFTER SIGN UP
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          createdAt: newUser.createdAt,
        };

        setCurrentUser(userData);
        setIsAuthenticated(true);

        localStorage.setItem(
          "creators_auth",
          JSON.stringify({ user: userData }),
        );
        resolve(userData);
      }, 1000);
    });
  };

  const login = async (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const user = users.find(
          (u) => u.email === email && u.password === password,
        );

        if (user) {
          const userData = {
            id: user.id,
            name: user.name,
            email: user.email,
            createdAt: user.createdAt,
          };

          setCurrentUser(userData);
          setIsAuthenticated(true);

          // Save to localStorage
          localStorage.setItem(
            "creators_auth",
            JSON.stringify({ user: userData }),
          );

          resolve(userData);
        } else {
          reject(
            new Error(
              "Invalid email or password. Please try again or create an account.",
            ),
          );
        }
      }, 1000);
    });
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("creators_auth");
  };

  const updateUserStats = (newStats) => {
    if (currentUser) {
      const updatedUser = {
        ...currentUser,
      };

      setCurrentUser(updatedUser);
      localStorage.setItem(
        "creators_auth",
        JSON.stringify({ user: updatedUser }),
      );

      // Update in users array
      setUsers((prev) =>
        prev.map((u) =>
          u.id === currentUser.id ? { ...u, ...updatedUser } : u,
        ),
      );
    }
  };

  const value = {
    isAuthenticated,
    currentUser,
    loading,
    signUp,
    login,
    logout,
    updateUserStats,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
