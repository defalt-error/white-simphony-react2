// src/pages/Ofertas.jsx
import React from "react";
import { listOffers } from "../data/products";
import ProductList from "../components/ProductList";
export default function Ofertas() {
  const offers = listOffers();
  return (
    <div className="container my-4">
      <h2 className="mb-3">Ofertas</h2>
      <ProductList products={offers} />
    </div>
  );
}