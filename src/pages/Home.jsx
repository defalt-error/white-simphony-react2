// src/pages/Home.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { listProducts } from "../data/products";

export default function Home() {
  const { addToCart } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const products = listProducts();

  const handleLogout = () => {
    logout();
    alert("Sesión cerrada correctamente 👋");
    navigate("/");
  };

  return (
    <div className="bg-black text-light">
      {/* 🏠 Banner de bienvenida */}
      <section
        className="text-center py-5"
        style={{
          backgroundImage: "url('/imagenes/Discotiendas.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
          textShadow: "2px 2px 8px rgba(0,0,0,0.8)",
        }}
      >
        <h1 className="fw-bold display-4 text-warning mb-3">
          🎵 Bienvenido a White Symphony
        </h1>
        <p className="fs-5 mb-4">
          Tu tienda de música favorita: vinilos, CDs y cassettes 🎶
        </p>

        {/* Si el usuario está logueado */}
        {user ? (
          <>
            <h4 className="mb-3">
              Hola, {user.name || "Cliente"} 👋
            </h4>
            {user.role === "admin" ? (
              <button
                className="btn btn-warning btn-lg mb-3"
                onClick={() => navigate("/admin")}
              >
                Ir al panel de administración 👑
              </button>
            ) : (
              <>
                <a href="#productos" className="btn btn-warning btn-lg mb-3 me-2">
                  Explorar productos
                </a>
                <button className="btn btn-danger btn-lg mb-3" onClick={handleLogout}>
                  Cerrar sesión
                </button>
              </>
            )}
          </>
        ) : (
          <a href="#productos" className="btn btn-warning btn-lg">
            Explorar productos
          </a>
        )}
      </section>

      {/* 🛍️ Listado de productos */}
      <section id="productos" className="container my-5">
        <h2 className="text-warning text-center mb-4">Productos Destacados</h2>

        <div className="row">
          {products.map((p) => (
            <div key={p.id} className="col-md-3 mb-4">
              <div className="card bg-dark text-light h-100 border-secondary">
                <img
                  src={p.image}
                  alt={p.name}
                  className="card-img-top"
                  style={{
                    height: "220px",
                    objectFit: "cover",
                    borderBottom: "1px solid #444",
                  }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-warning">{p.name}</h5>
                  <p className="card-text mb-3">${p.price.toLocaleString()}</p>
                  <button
                    className="btn btn-warning mt-auto"
                    onClick={() => addToCart(p)}
                  >
                    Agregar al carrito 🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
