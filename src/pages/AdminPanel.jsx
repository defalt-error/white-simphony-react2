// src/pages/AdminPanel.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function AdminPanel() {
  const { user, logout } = useAuth();
  const [ventas, setVentas] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [reseñas, setReseñas] = useState([]);
  const [stats, setStats] = useState({
    totalVentas: 0,
    transacciones: 0,
    productosVendidos: 0,
  });

  // 📦 Cargar datos
  useEffect(() => {
    try {
      const savedSales = JSON.parse(localStorage.getItem("ws_sales") || "[]");
      const savedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const savedReviews = JSON.parse(localStorage.getItem("ws_reviews") || "[]");

      setVentas(savedSales);
      setUsuarios(savedUsers);
      setReseñas(savedReviews);

      const totalVentas = savedSales.reduce((sum, v) => sum + (v.total || 0), 0);
      const productosVendidos = savedSales.reduce(
        (sum, v) => sum + v.items.reduce((a, b) => a + (b.quantity || 1), 0),
        0
      );

      setStats({
        totalVentas,
        transacciones: savedSales.length,
        productosVendidos,
      });
    } catch (err) {
      console.error("Error cargando datos:", err);
    }
  }, []);

  // 🗑️ Eliminar usuario
  const eliminarUsuario = (email) => {
    if (confirm(`¿Eliminar usuario "${email}"?`)) {
      const updated = usuarios.filter((u) => u.email !== email);
      setUsuarios(updated);
      localStorage.setItem("users", JSON.stringify(updated));
      alert("Usuario eliminado ✅");
    }
  };

  // 🗑️ Eliminar reseña
  const eliminarReseña = (fecha) => {
    const updated = reseñas.filter((r) => r.fecha !== fecha);
    setReseñas(updated);
    localStorage.setItem("ws_reviews", JSON.stringify(updated));
  };

  // 🚫 Si no es admin
  if (!user || user.role !== "admin") {
    return (
      <div className="container text-center text-light my-5">
        <h2>Acceso denegado 🚫</h2>
        <p>Solo los administradores pueden ver esta página.</p>
      </div>
    );
  }

  // 🖥️ Panel
  return (
    <div className="container text-light my-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="text-warning fw-bold">Panel de Administración</h2>
        <button
          className="btn btn-danger"
          onClick={() => {
            logout();
            alert("Sesión cerrada 👋");
            window.location.href = "/";
          }}
        >
          Cerrar sesión
        </button>
      </div>

      {/* Estadísticas */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card bg-dark text-center p-3 border-secondary">
            <h5>Total Ventas</h5>
            <p className="fs-4 text-warning">${stats.totalVentas.toLocaleString()}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-center p-3 border-secondary">
            <h5>Transacciones</h5>
            <p className="fs-4 text-warning">{stats.transacciones}</p>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card bg-dark text-center p-3 border-secondary">
            <h5>Productos Vendidos</h5>
            <p className="fs-4 text-warning">{stats.productosVendidos}</p>
          </div>
        </div>
      </div>

      {/* Ventas */}
      <h3 className="text-warning mb-3">Ventas realizadas</h3>
      {ventas.length === 0 ? (
        <p>No hay ventas registradas.</p>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-dark table-striped align-middle border-secondary">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Productos</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Método</th>
              </tr>
            </thead>
            <tbody>
              {ventas.map((v, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{v.cliente}</td>
                  <td>{v.items.map((p) => p.name).join(", ")}</td>
                  <td>{v.items.reduce((s, p) => s + (p.quantity || 1), 0)}</td>
                  <td>${(v.total || 0).toLocaleString()}</td>
                  <td>{new Date(v.fecha).toLocaleDateString()}</td>
                  <td>{v.metodo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Usuarios */}
      <h3 className="text-warning mb-3">Usuarios registrados</h3>
      {usuarios.length === 0 ? (
        <p>No hay usuarios registrados.</p>
      ) : (
        <div className="table-responsive mb-5">
          <table className="table table-dark table-striped align-middle border-secondary">
            <thead>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map((u, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarUsuario(u.email)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Reseñas */}
      <h3 className="text-warning mb-3">Reseñas de clientes</h3>
      {reseñas.length === 0 ? (
        <p>No hay reseñas registradas.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-dark table-striped align-middle border-secondary">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Rating</th>
                <th>Comentario</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {reseñas.map((r, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{r.cliente}</td>
                  <td>
                    {"⭐".repeat(r.rating)}{" "}
                    <small className="text-muted">({r.rating}/5)</small>
                  </td>
                  <td>{r.comentario}</td>
                  <td>{new Date(r.fecha).toLocaleDateString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => eliminarReseña(r.fecha)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
