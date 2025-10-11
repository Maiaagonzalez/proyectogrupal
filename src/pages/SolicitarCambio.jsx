import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { useAuth } from "../providers/AuthProvider";

export default function SolicitarCambio() {
  const { id } = useParams();
  const [nuevoEstado, setNuevoEstado] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nuevoEstado) return alert("Seleccioná el nuevo estado");

    await addDoc(collection(db, "solicitudes"), {
      aulaId: id,
      solicitadoPor: user.email,
      nuevoEstado,
      estado: "pendiente",
      fecha: Timestamp.now(),
    });

    alert("Solicitud enviada correctamente ✅");
    navigate("/aulas");
  };

  return (
    <div className="solicitud-page">
      <div className="solicitud-form-card">
        <h2>Solicitar cambio de estado</h2>

        <form className="solicitud-form" onSubmit={handleSubmit}>
          <p>Seleccioná el nuevo estado del aula:</p>

          <div className="radio-group">
            <label>
              <input
                type="radio"
                value="Limpio"
                checked={nuevoEstado === "Limpio"}
                onChange={(e) => setNuevoEstado(e.target.value)}
              />
              Aula Limpia
            </label>
            <label>
              <input
                type="radio"
                value="Sucio"
                checked={nuevoEstado === "Sucio"}
                onChange={(e) => setNuevoEstado(e.target.value)}
              />
              Aula Sucia
            </label>
          </div>

          <button type="submit" className="btn-login">
            Enviar solicitud
          </button>
        </form>

        <button
          className="btn-secondary volver-btn"
          onClick={() => navigate("/aulas")}
        >
          ← Volver
        </button>
      </div>
    </div>
  );
}