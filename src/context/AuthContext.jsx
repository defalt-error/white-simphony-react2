import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔄 Al iniciar la app, recupera el usuario guardado
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // ✅ Guardar sesión en localStorage
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("loggedUser", JSON.stringify(userData));

    // Si es admin, también marcarlo
    if (userData.role === "admin") {
      localStorage.setItem("adminLogged", "true");
      localStorage.setItem("adminUser", userData.email);
    }
  };

  // 🚪 Cerrar sesión global
  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedUser");
    localStorage.removeItem("adminLogged");
    localStorage.removeItem("adminUser");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
