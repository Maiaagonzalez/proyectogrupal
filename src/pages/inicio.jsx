import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function Inicio() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/aulas");
    } catch (err) {
      setError("Error en login: " + err.message);
    }
  };

  return (
    <div className="login-page">
  <div className="login-card">
    <h2>Iniciar sesión</h2>
    <form className="login-form" onSubmit={handleLogin}>
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="btn-login" type="submit">
            Entrar
          </button>
         </form>
    <p>¿No tenés cuenta? <Link to="/registro">Registrate aquí</Link></p>
  </div>
</div>
  );
}