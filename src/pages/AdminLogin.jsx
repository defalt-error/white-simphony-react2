import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { registerUser, loginUser } from "../utils/auth";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [view, setView] = useState("login");
  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const STORAGE = window.localStorage;

  useEffect(() => {
    const admins = JSON.parse(STORAGE.getItem("admins") || "[]");
    if (admins.length === 0) {
      STORAGE.setItem("admins", JSON.stringify([{ user: "admin", pass: "1234" }]));
    }
  }, []);

  const onLogin = () => {
    if (!user || !pass) return setMsg("Completa usuario y contraseña");
    const r = loginUser(STORAGE, "admins", user, pass);
    if (r.ok) { STORAGE.setItem("adminLogged","true"); STORAGE.setItem("adminUser", user); navigate("/admin"); }
    else setMsg(r.error);
  };
  const onRegister = () => {
    if (!user || !pass) return setMsg("Completa todos los campos");
    const r = registerUser(STORAGE, "admins", user, pass);
    if (r.ok) { setMsg("Admin creado, ahora puedes iniciar sesión"); setView("login"); }
    else setMsg(r.error);
  };

  return (
    <>
      <Navbar />
      <main>
        <div className="auth-wrapper">
          <h2>Acceso de Administrador</h2>
          <label>Usuario</label><input value={user} onChange={e=>setUser(e.target.value)} />
          <label>Contraseña</label><input type="password" value={pass} onChange={e=>setPass(e.target.value)} />
          {view==="login" ? (
            <div className="auth-actions">
              <button onClick={onLogin}>Iniciar sesión</button>
              <button className="secondary" onClick={()=>{setView("register"); setMsg("");}}>Crear admin</button>
            </div>
          ) : (
            <div className="auth-actions">
              <button onClick={onRegister}>Registrar</button>
              <button className="secondary" onClick={()=>{setView("login"); setMsg("");}}>Volver a iniciar sesión</button>
            </div>
          )}
          <div className="auth-error">{msg}</div>
          <div className="auth-toggle" style={{marginTop:12}}>
            <Link to="/cliente">¿Eres cliente?</Link>
          </div>
        </div>
      </main>
    </>
  );
}
