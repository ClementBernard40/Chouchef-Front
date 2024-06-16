import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      const storedUserId = await AsyncStorage.getItem("userId");
      setIsAuthenticated(!!token);
      setUserId(storedUserId);
    };

    checkAuth();
  }, []);

  const signIn = async (token, id) => {
    console.log("~~~~~~~~~~~~~~~~~~------------------~~~~~~~~~~~~~~~~~~~~~");

    console.log(token);
    console.log(id);
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    await AsyncStorage.setItem("userToken", token);
    await AsyncStorage.setItem("userId", id);
    setIsAuthenticated(true);
    setUserId(id);
  };

  const signOut = async () => {
    console.log(await AsyncStorage.getItem("userToken"));
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("userId");
    setIsAuthenticated(false);
    setUserId("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userId, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
