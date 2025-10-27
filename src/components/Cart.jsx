import { useEffect, useState } from "react";
import { addToCart as add, removeFromCart as remove, cartTotal } from "../utils/cart";

export default function Cart() {
  const KEY = "cart";
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem(KEY) || "[]"));

  useEffect(() => { localStorage.setItem(KEY, JSON.stringify(cart)); }, [cart]);
  useEffect(() => { window.addToCart = (name, price) => setCart(prev => add(prev, { name, price })); }, []);

  const total = cartTotal(cart);

  return (
    <>
      <a href="#" id="cart-btn" onClick={(e)=>{e.preventDefault(); setOpen(o=>!o);}}>
        🛒 Carrito <span id="cart-count">{cart.length}</span>
      </a>
      <div id="cart-panel" className={open ? "open" : ""}>
        <button id="close-cart" onClick={()=>setOpen(false)}>Cerrar</button>
        <ul id="cart-items">
          {cart.map((item, idx) => (
            <li key={idx}>
              {item.name} - ${item.price}{" "}
              <button className="remove-item" onClick={()=>setCart(prev=>remove(prev, idx))}>Eliminar</button>
            </li>
          ))}
        </ul>
        <div>Total: $<span id="cart-total">{total}</span></div>
      </div>
    </>
  );
}
