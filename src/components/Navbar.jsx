import { Link } from "react-router-dom";
import Cart from "./Cart";

export default function Navbar() {
  return (
    <header>
      <div className="logo">
        <img src="/imagenes/Diseño sin título.png" alt="Logo Tienda" style={{height:40}} />
        <h1>White symphony</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#categorias">Categorías</a></li>
          <li><a href="#mas-vendidos">Más vendidos</a></li>
          <li><a href="#recien-llegados">Recién llegados</a></li>
          <li><a href="#en-oferta">En oferta</a></li>
          <li className="dropdown">
            <button className="dropbtn">Iniciar sesión</button>
            <div className="dropdown-content">
              <Link to="/cliente">Cliente</Link>
              <Link to="/login">Administrador</Link>
            </div>
          </li>
          <li><Cart /></li>
        </ul>
      </nav>
    </header>
  );
}
