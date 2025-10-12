import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

function isValidEmail(email) {
  return /\S+@\S+\.\S+/.test(email);
}

export default function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("estudiante");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre) {
      setError("El nombre es obligatorio");
      return;
    }
    if (!isValidEmail(email)) {
      setError("El email no es válido");
      return;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        nombre,
        email,
        role,
      });
      navigate("/aulas");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="page-container">
      <div className="login-card">
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} className="login-form">
          {error && <p style={{ color: "red" }}>{error}</p>}

          <input
            type="text"
            placeholder="Nombre completo"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />

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

          <label>Rol</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="estudiante">Estudiante</option>
            <option value="limpieza">Personal de limpieza</option>
            <option value="admin">Directivo</option>
          </select>

          <button className="btn-login" type="submit">
            Registrar
          </button>
          <p>¿Ya tenes cuenta?</p>
          <button className="btn-iniciar" onClick={() => navigate(-1)}>
            Inicia Sesion
          </button> 
          </form>
      </div>
    </div>
  );
}