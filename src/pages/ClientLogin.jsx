import { useState } from "react";
import Navbar from "../components/Navbar";
import { registerUser, loginUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function ClientLogin() {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const STORAGE = window.localStorage;

  const onLogin = () => {
    if (!user || !pass) return setMsg("Completa usuario y contraseña");
    const r = loginUser(STORAGE, "clients", user, pass);
    if (r.ok) { STORAGE.setItem("clientLogged","true"); STORAGE.setItem("clientUser", user); navigate("/"); }
    else setMsg(r.error);
  };
  const onRegister = () => {
    if (!user || !pass) return setMsg("Completa todos los campos");
    const r = registerUser(STORAGE, "clients", user, pass);
    if (r.ok) { setMsg("Cuenta creada, ahora puedes iniciar sesión"); setView("login"); }
    else setMsg(r.error);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="auth-wrapper">
          <h2>Acceso de Cliente</h2>
          <label>Usuario</label><input value={user} onChange={e=>setUser(e.target.value)} />
          <label>Contraseña</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          {view==="login" ? (
            <div className="auth-actions">
              <button onClick={onLogin}>Iniciar sesión</button>
              <button className="secondary" onClick={()=>{setView("register"); setMsg("");}}>Crear cuenta</button>
            </div>
          ) : (
            <div className="auth-actions">
              <button onClick={onRegister}>Registrar</button>
              <button className="secondary" onClick={()=>{setView("login"); setMsg("");}}>Volver a iniciar sesión</button>
            </div>
          )}
          <div className="auth-error">{msg}</div>
        </div>
      </main>
    </>
  );
}
