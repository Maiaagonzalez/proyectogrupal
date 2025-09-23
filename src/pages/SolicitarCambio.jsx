import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { collection, addDoc, doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../providers/AuthProvider";

export default function SolicitarCambio() {
  const { id } = useParams(); // id del aula
  const { user } = useAuth();
  const [nuevoEstado, setNuevoEstado] = useState("Limpio");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const aulaSnap = await getDoc(doc(db, "aulas", id));
    if (!aulaSnap.exists()) {
      alert("El aula no existe");
      return;
    }
    const aulaData = aulaSnap.data();

    await addDoc(collection(db, "solicitudes"), {
      aulaId: id,
      usuarioId: user.uid,
      estadoSolicitado: nuevoEstado,
      estadoActual: aulaData.estado,
      estadoSolicitud: "pendiente",
      fecha: new Date().toISOString(),
    });

    alert("Solicitud enviada ✅");
    navigate("/aulas");
  };

  return (
    <div className="page-container">
      <div className="solicitud-form-card">
        <h2>📩 Solicitar cambio de estado</h2>
        <form onSubmit={handleSubmit} className="solicitud-form">
          <label htmlFor="estado">Nuevo estado</label>
          <select
            id="estado"
            value={nuevoEstado}
            onChange={(e) => setNuevoEstado(e.target.value)}
          >
            <option value="Limpio">Limpio</option>
            <option value="Sucio">Sucio</option>
          </select>
          <button type="submit" className="btn-login">
            Enviar solicitud
          </button>
        </form>
      </div>
    </div>
  );
}