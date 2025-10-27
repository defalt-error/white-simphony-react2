import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  // 👇 Crea automáticamente un admin en localStorage si no existe
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const adminExists = users.some((u) => u.email === "admin@ws.com");
    if (!adminExists) {
      users.push({
        name: "Administrador",
        email: "admin@ws.com",
        password: "1234",
        role: "admin",
      });
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    // ✅ Verifica si es el administrador
    if (email === "admin@ws.com" && password === "1234") {
      const adminData = {
        name: "Administrador",
        email,
        role: "admin",
      };
      login(adminData);
      localStorage.setItem("adminLogged", "true");
      localStorage.setItem("adminUser", email);
      alert("Bienvenido Administrador 👑");
      navigate("/admin");
      return;
    }

    // ✅ Resto de usuarios normales
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!found) {
      alert("Credenciales incorrectas o usuario no existe.");
      return;
    }

    login(found);
    alert(`Bienvenido ${found.name}!`);
    navigate("/");
  };

  return (
    <div
      className="container my-5 text-light"
      style={{ maxWidth: "450px", minHeight: "80vh" }}
    >
      <h2 className="text-center mb-4 text-warning">Iniciar sesión</h2>

      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Correo electrónico</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-secondary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            className="form-control bg-dark text-light border-secondary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-warning w-100">
          Entrar
        </button>
      </form>

      <p className="mt-3 text-center">
        ¿No tienes cuenta?{" "}
        <Link to="/register" className="text-warning fw-bold">
          Crea una aquí
        </Link>
      </p>
    </div>
  );
}
