// src/pages/Carrito.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Carrito() {
  const { cart, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  if (!cart.length) {
    return (
      <div className="container text-center text-light my-5">
        <h2 className="text-warning mb-3">Tu carrito está vacío 🛒</h2>
        <Link to="/" className="btn btn-warning">
          Volver a la tienda
        </Link>
      </div>
    );
  }

  return (
    <div className="container my-5 text-light">
      <h2 className="text-warning mb-4">Tu Carrito</h2>

      <table className="table table-dark table-striped align-middle">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map((item, i) => (
            <tr key={i}>
              <td>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "50px",
                        height: "50px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                  {item.name}
                </div>
              </td>
              <td>{item.qty}</td>
              <td>${item.price.toLocaleString()}</td>
              <td>${(item.price * item.qty).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-secondary text-dark fw-bold">
            <td colSpan="3" className="text-end">
              Total:
            </td>
            <td>${total.toLocaleString()}</td>
            <td></td>
          </tr>
        </tfoot>
      </table>

      <div className="d-flex justify-content-between mt-4">
        <button className="btn btn-outline-light" onClick={clearCart}>
          Vaciar carrito
        </button>
        <button
          className="btn btn-warning"
          onClick={() => navigate("/checkout")}
        >
          Finalizar compra
        </button>
      </div>
    </div>
  );
}
