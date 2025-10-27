// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // 🔄 Cargar carrito guardado
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("ws_cart_v1")) || [];
      setCart(saved);
    } catch {
      setCart([]);
    }
  }, []);

  // 💾 Guardar carrito en localStorage
  useEffect(() => {
    localStorage.setItem("ws_cart_v1", JSON.stringify(cart));
  }, [cart]);

  // ✅ Agregar producto (sumando cantidad si ya existe)
  const addToCart = (product, qty = 1) => {
    if (!product || !product.id) return;

    setCart((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: Number(product.price) || 0,
          qty,
          image: product.image || "",
        },
      ];
    });
  };

  // 🗑 Eliminar un producto
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  // 🧹 Vaciar todo
  const clearCart = () => setCart([]);

  // 💰 Calcular total
  const total = cart.reduce(
    (acc, item) => acc + (item.price || 0) * (item.qty || 0),
    0
  );

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
