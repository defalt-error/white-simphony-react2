// src/components/ProductList.jsx
import React from "react";

export default function ProductList({ products, onAddToCart }) {
  return (
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
                onClick={() => onAddToCart && onAddToCart(p)}
              >
                Agregar al carrito 🛒
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
