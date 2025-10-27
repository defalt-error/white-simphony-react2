// src/pages/Checkout.jsx
import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [metodoPago, setMetodoPago] = useState("Tarjeta de Crédito");

  // Calcular total
  const total = cart.reduce(
    (sum, item) => sum + (item.price || 0) * (item.quantity || 1),
    0
  );

  const handleCompra = () => {
    if (cart.length === 0) {
      alert("Tu carrito está vacío 🛒");
      return;
    }

    // Crear objeto venta
    const nuevaVenta = {
      cliente: user?.name || "Invitado",
      items: cart,
      total,
      fecha: new Date().toISOString(),
      metodo: metodoPago,
    };

    try {
      // Guardar en localStorage
      const ventas = JSON.parse(localStorage.getItem("ws_sales") || "[]");
      ventas.push(nuevaVenta);
      localStorage.setItem("ws_sales", JSON.stringify(ventas));

      // Limpiar carrito
      clearCart();

      alert("✅ Compra realizada con éxito!");
      navigate("/compra-exitosa");
    } catch (error) {
      console.error("Error guardando venta:", error);
      alert("❌ Hubo un error al procesar tu compra.");
      navigate("/compra-fallida");
    }
  };

  return (
    <div className="container text-light my-5">
      <h2 className="text-warning mb-4">Finalizar Compra</h2>

      {cart.length === 0 ? (
        <p>Tu carrito está vacío. Agrega productos antes de comprar.</p>
      ) : (
        <>
          {/* Tabla de resumen */}
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.quantity || 1}</td>
                  <td>${item.price.toLocaleString()}</td>
                  <td>${((item.price || 0) * (item.quantity || 1)).toLocaleString()}</td>
                </tr>
              ))}
              <tr>
                <td colSpan="3" className="text-end fw-bold">
                  Total:
                </td>
                <td className="fw-bold text-warning">${total.toLocaleString()}</td>
              </tr>
            </tbody>
          </table>

          {/* Selección de método de pago */}
          <div className="mb-4">
            <label className="form-label">Método de pago:</label>
            <select
              className="form-select bg-dark text-light border-secondary"
              value={metodoPago}
              onChange={(e) => setMetodoPago(e.target.value)}
            >
              <option>Tarjeta de Crédito</option>
              <option>Tarjeta de Débito</option>
              <option>Transferencia Bancaria</option>
              <option>PayPal</option>
            </select>
          </div>

          <button onClick={handleCompra} className="btn btn-warning">
            Confirmar compra
          </button>
        </>
      )}
    </div>
  );
}
