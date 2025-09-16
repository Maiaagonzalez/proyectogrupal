import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function AltaDato({ onAdd }) {
  const [nombre, setNombre] = useState("");
  const [estado, setEstado] = useState("Sucio");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre) return;

    await addDoc(collection(db, "aulas"), {
      nombre,
      estado,
    });

    setNombre("");
    setEstado("Sucio");
    if (onAdd) onAdd(); // refresca la lista
  };

  return (
    <div className="card bg-dark p-3 mb-4">
      <h3 className="mb-3">➕ Agregar Aula</h3>
      <form onSubmit={handleSubmit} className="d-flex gap-2">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre del Aula"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <select
          className="form-select"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        >
          <option value="Sucio">Sucio</option>
          <option value="Limpio">Limpio</option>
        </select>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
}
