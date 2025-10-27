// src/pages/Ofertas.jsx
import React from "react";
import { useCart } from "../context/CartContext";
import { listOffers } from "../data/products";
import ProductList from "../components/ProductList";

export default function Ofertas() {
  const offers = listOffers();
  const { addToCart } = useCart(); // ✅ Obtenemos la función del carrito

  return (
    <div className="container my-5 text-light">
      <h2 className="text-warning text-center mb-4">🔥 Ofertas Especiales 🔥</h2>

      {offers.length > 0 ? (
        <ProductList products={offers} onAddToCart={addToCart} />
      ) : (
        <p className="text-center text-secondary">No hay ofertas disponibles en este momento.</p>
      )}
    </div>
  );
}
