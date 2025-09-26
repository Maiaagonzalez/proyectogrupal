import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AulaList() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const cargarDatos = async () => {
      const snapshot = await getDocs(collection(db, "aulas"));
      setAulas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    cargarDatos();
  }, []);

  return (
    <div className="card bg-dark p-3">
      <h3 className="mb-3">📋 Lista de Aulas</h3>
      {aulas.length === 0 ? (
        <p>No hay aulas cargadas.</p>
      ) : (
        <ul className="list-group">
          {aulas.map((aula) => (
            <li key={aula.id} className="list-group-item">
              <strong>{aula.nombre}</strong> – Estado: {aula.estado}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}