import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function ListadoDatos() {
  const [aulas, setAulas] = useState([]);

  const cargarDatos = async () => {
    const snapshot = await getDocs(collection(db, "aulas"));
    setAulas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const eliminarAula = async (id) => {
    await deleteDoc(doc(db, "aulas", id));
    cargarDatos();
  };

  const cambiarEstado = async (id, estadoActual) => {
    const nuevoEstado = estadoActual === "Limpio" ? "Sucio" : "Limpio";
    await updateDoc(doc(db, "aulas", id), { estado: nuevoEstado });
    cargarDatos();
  };

  return (
    <div className="card bg-dark p-3">
      <h3 className="mb-3">📋 Lista de Aulas</h3>
      {aulas.length === 0 ? (
        <p>No hay aulas cargadas.</p>
      ) : (
        <ul className="list-group">
          {aulas.map((aula) => (
            <li
              key={aula.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>{aula.nombre}</strong> – Estado:{" "}
                <span
                  className={`badge ${
                    aula.estado === "Limpio" ? "bg-success" : "bg-danger"
                  }`}
                >
                  {aula.estado}
                </span>
              </span>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => cambiarEstado(aula.id, aula.estado)}
                >
                  Cambiar Estado
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => eliminarAula(aula.id)}
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}