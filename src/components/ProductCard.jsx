// src/components/ProductCard.jsx
import React from "react";
import { useCart } from "../context/CartContext";
export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  return (
    <div className="card h-100">
      {product.image && <img src={product.image} className="card-img-top" alt={product.name} />}
      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{product.name}</h5>
        <p className="card-text mb-1"><span className="badge bg-secondary">{product.category}</span></p>
        {product.offer && <p className="mb-1"><span className="badge bg-success">Oferta</span></p>}
        <p className="fw-bold mt-auto">${(product.price).toLocaleString("es-CL")}</p>
        <button className="btn btn-primary w-100" onClick={() => addToCart(product.id)}>Agregar</button>
      </div>
    </div>
  );
}