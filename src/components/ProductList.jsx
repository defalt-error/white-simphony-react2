// src/components/ProductList.jsx
import React from "react";
import ProductCard from "./ProductCard";
export default function ProductList({ products }) {
  if (!products?.length) return <p className="text-muted">No hay productos.</p>;
  return (
    <div className="row g-3">
      {products.map(p => (
        <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={p.id}>
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}