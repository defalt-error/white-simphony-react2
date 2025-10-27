// src/pages/Categorias.jsx
import React from "react";
import { listCategories, listProducts } from "../data/products";
import ProductList from "../components/ProductList";
export default function Categorias() {
  const categories = listCategories();
  const products = listProducts();
  return (
    <div className="container my-4">
      <h2 className="mb-3">Categorías</h2>
      {categories.map(cat => (
        <div className="mb-4" key={cat}>
          <h5 className="mb-3"><span className="badge bg-dark">{cat}</span></h5>
          <ProductList products={products.filter(p => p.category === cat)} />
        </div>
      ))}
    </div>
  );
}