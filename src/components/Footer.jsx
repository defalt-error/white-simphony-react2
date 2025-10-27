// src/components/Footer.jsx
import React from "react";
export default function Footer() {
  return (
    <footer className="py-4 bg-dark text-white mt-5">
      <div className="container text-center small">
        © White Symphony {new Date().getFullYear()} · Hecho con React + Bootstrap
      </div>
    </footer>
  );
}