import { addToCart, removeFromCart, cartTotal } from "../utils/cart.js";

describe("Carrito", () => {
  it("agrega un producto correctamente", () => {
    let cart = [];
    const product = { id: 1, name: "CD Foo Fighters", price: 10000 };
    cart = addToCart(cart, product);
    expect(cart.length).toBe(1);
    expect(cart[0].quantity).toBe(1);
  });

  it("elimina un producto por ID válido", () => {
    let cart = [
      { id: 1, name: "CD Foo Fighters", price: 10000, quantity: 1 },
      { id: 2, name: "Vinilo Nirvana", price: 20000, quantity: 1 },
    ];
    cart = removeFromCart(cart, 1);
    expect(cart.length).toBe(1);
    expect(cart[0].id).toBe(2);
  });

  it("calcula el total con strings y números", () => {
    const cart = [
      { price: 10000, quantity: 2 },
      { price: "5000", quantity: 1 },
    ];
    expect(cartTotal(cart)).toBe(25000);
  });
});
