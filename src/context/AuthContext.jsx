import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  // null = belum login (tamu)
  const [user, setUser] = useState(null);

  const logout = () => {
    setUser(null)
  };

  const [isLoading, setIsLoading] = useState(false)
  
  const value = {
    user,
    setUser,
    isLoading, 
    setIsLoading,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth harus dipakai di dalam <AuthProvider>.");
  }
  return ctx;
}