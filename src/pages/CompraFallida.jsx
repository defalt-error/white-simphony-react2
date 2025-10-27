// src/pages/CompraFallida.jsx
import React from "react";
import { Link } from "react-router-dom";
export default function CompraFallida() {
  return (
    <div className="container my-5 text-center">
      <h2 className="text-danger">No se pudo realizar el pago</h2>
      <p>Por favor, intenta nuevamente.</p>
      <div className="d-flex gap-2 justify-content-center">
        <Link className="btn btn-secondary" to="/carrito">Volver al carrito</Link>
        <Link className="btn btn-outline-primary" to="/checkout">Ir a checkout</Link>
      </div>
    </div>
  );
}