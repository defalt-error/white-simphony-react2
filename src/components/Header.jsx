import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  // 🚪 Cierre de sesión total
  const handleLogout = () => {
    logout(); // limpia el contexto
    localStorage.removeItem("adminLogged");
    localStorage.removeItem("adminUser");
    alert("Sesión cerrada correctamente 👋");
    navigate("/login"); // redirige al login
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black shadow-sm">
      <div className="container">
        {/* 🏠 Logo */}
        <Link className="navbar-brand fw-bold text-warning" to="/">
          <img
            src="/imagenes/logo.png"
            alt="White Symphony"
            style={{ height: "40px", marginRight: "8px" }}
          />
          White Symphony
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#nav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="nav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0 align-items-lg-center">

            {/* Enlaces principales */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">Categorías</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/ofertas">Ofertas</NavLink>
            </li>

            {/* 👑 Solo visible si el usuario es admin */}
            {user?.role === "admin" && (
              <li className="nav-item">
                <NavLink className="nav-link text-warning fw-bold" to="/admin">
                  Panel Admin
                </NavLink>
              </li>
            )}

            {/* 🛒 Carrito */}
            <li className="nav-item ms-lg-3">
              <NavLink className="nav-link" to="/carrito">
                🛒 Carrito ({cart.length})
              </NavLink>
            </li>

            {/* 👤 Usuario o botón de Login */}
            {!user ? (
              <li className="nav-item ms-lg-3">
                <NavLink className="btn btn-sm btn-outline-warning" to="/login">
                  Iniciar sesión
                </NavLink>
              </li>
            ) : (
              <li className="nav-item dropdown ms-lg-3">
                <a
                  className="nav-link dropdown-toggle text-warning"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                >
                  {user.name} ({user.role})
                </a>
                <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning">
                  <li>
                    <NavLink className="dropdown-item text-light" to="/perfil">
                      Perfil
                    </NavLink>
                  </li>
                  <li>
                    <button
                      className="dropdown-item text-danger fw-bold"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
