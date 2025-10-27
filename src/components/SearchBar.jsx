// src/components/SearchBar.jsx
import React from "react";
export default function SearchBar({ query, setQuery }) {
  return (
    <input className="form-control" placeholder="Buscar productos..." value={query} onChange={(e) => setQuery(e.target.value)} />
  );
}