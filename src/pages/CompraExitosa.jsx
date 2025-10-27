// src/pages/CompraExitosa.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CompraExitosa() {
  const { user } = useAuth();
  const [rating, setRating] = useState(5);
  const [comentario, setComentario] = useState("");
  const [enviado, setEnviado] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const nuevaReview = {
      cliente: user?.name || "Invitado",
      rating,
      comentario,
      fecha: new Date().toISOString(),
    };

    const reviews = JSON.parse(localStorage.getItem("ws_reviews") || "[]");
    reviews.push(nuevaReview);
    localStorage.setItem("ws_reviews", JSON.stringify(reviews));

    setEnviado(true);
    setComentario("");
    setRating(5);
  };

  return (
    <div className="container text-light text-center my-5">
      <h2 className="text-warning mb-3">¡Compra realizada con éxito! 🎉</h2>
      <p>Gracias por confiar en White Symphony.</p>

      {!enviado ? (
        <div className="mt-4 p-4 bg-dark rounded-4 border border-secondary" style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h4 className="text-warning mb-3">Deja tu reseña</h4>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Puntuación:</label>
              <select
                className="form-select bg-black text-light border-secondary"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
              >
                <option value={5}>⭐️⭐️⭐️⭐️⭐️ - Excelente</option>
                <option value={4}>⭐️⭐️⭐️⭐️ - Muy buena</option>
                <option value={3}>⭐️⭐️⭐️ - Buena</option>
                <option value={2}>⭐️⭐️ - Regular</option>
                <option value={1}>⭐️ - Mala</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Comentario:</label>
              <textarea
                className="form-control bg-black text-light border-secondary"
                rows="3"
                placeholder="¿Cómo fue tu experiencia?"
                value={comentario}
                onChange={(e) => setComentario(e.target.value)}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-warning w-100">
              Enviar reseña
            </button>
          </form>
        </div>
      ) : (
        <div className="mt-4">
          <p className="text-success">✅ ¡Gracias por tu reseña!</p>
          <button className="btn btn-outline-warning mt-3" onClick={() => navigate("/")}>
            Volver al inicio
          </button>
        </div>
      )}
    </div>
  );
}
