// src/utils/cart.js

// Añadir producto al carrito
export function addToCart(cart, product) {
  const existing = cart.find(p => p.id === product.id);
  if (existing) {
    existing.quantity = (existing.quantity || 1) + 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  return [...cart];
}

// Eliminar producto por ID
export function removeFromCart(cart, productId) {
  return cart.filter(p => p.id !== productId);
}

// Calcular total de la compra
export function cartTotal(cart) {
  return cart.reduce((sum, p) => sum + Number(p.price) * (p.quantity || 1), 0);
}
