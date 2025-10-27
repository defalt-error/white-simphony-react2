// src/pages/Categorias.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { listCategories, listProducts } from "../data/products";
import ProductList from "../components/ProductList";

export default function Categorias() {
  const categories = listCategories();
  const products = listProducts();
  const { addToCart } = useCart(); // ✅ Importamos el método del carrito

  return (
    <div className="container my-4 text-light">
      <h2 className="text-warning mb-3 text-center">Categorías</h2>

      {categories.map((cat) => (
        <div className="mb-5" key={cat}>
          <h4 className="text-light bg-dark px-3 py-2 rounded">
            🎧 {cat}
          </h4>
          {/* ✅ Pasamos la función addToCart al ProductList */}
          <ProductList
            products={products.filter((p) => p.category === cat)}
            onAddToCart={addToCart}
          />
        </div>
      ))}
    </div>
  );
}
