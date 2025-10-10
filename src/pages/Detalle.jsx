import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Detalle() {
  const { id } = useParams();
  const [aula, setAula] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerAula = async () => {
      try {
        const aulaRef = doc(db, "aulas", id);
        const aulaSnap = await getDoc(aulaRef);
        if (aulaSnap.exists()) {
          setAula(aulaSnap.data());
        } else {
          console.log("No existe el aula");
        }
      } catch (error) {
        console.error("Error al obtener el aula:", error);
      }
    };

    obtenerAula();
  }, [id]);

  if (!aula) {
    return (
      <div className="detalle-container">
        <p>Cargando información...</p>
      </div>
    );
  }

  return (
    <div className="detalle-container">
      <div className="detalle-card">
        <h2>{aula.nombre}</h2>
        <p>
          <strong>Estado:</strong> {aula.estado}
        </p>
        <p>
          <strong>ID del Aula:</strong> {id}
        </p>

        <button className="btn-volver" onClick={() => navigate(-1)}>
          Volver
        </button>
      </div>
    </div>
  );
}