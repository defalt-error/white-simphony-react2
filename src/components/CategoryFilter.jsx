// src/components/CategoryFilter.jsx
import React from "react";
export default function CategoryFilter({ categories, selected, onChange }) {
  return (
    <select className="form-select" value={selected} onChange={(e)=>onChange(e.target.value)}>
      <option value="">Todas las categorías</option>
      {categories.map(c => <option key={c} value={c}>{c}</option>)}
    </select>
  );
}