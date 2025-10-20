import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc, addDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebaseConfig";
import { useAuth } from "../providers/AuthProvider";

export default function Aulas() {
  const [aulas, setAulas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState("");
  const [nuevoEstado, setNuevoEstado] = useState("Limpio");
  const { role, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, "aulas"));
      setAulas(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "aulas", id));
    setAulas(aulas.filter((a) => a.id !== id));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!nuevoNombre.trim()) return alert("Por favor ingresa un nombre de aula.");

    try {
      const docRef = await addDoc(collection(db, "aulas"), {
        nombre: nuevoNombre,
        estado: nuevoEstado,
      });
      setAulas([...aulas, { id: docRef.id, nombre: nuevoNombre, estado: nuevoEstado }]);
      setNuevoNombre("");
      setNuevoEstado("Limpio");
    } catch (error) {
      console.error("Error al agregar aula:", error);
    }
  };

  return (
    <div className="page-container">
      <div className="aula-card">
        {/* Encabezado */}
        <div className="aula-header">
          <h2>Lista de Aulas</h2>
          <div>
            {role === "admin" && (
              <button
                className="btn-secondary"
                onClick={() => navigate("/revisar")}
              >
                Revisar solicitudes
              </button>
            )}
            <button className="btn-salirb" onClick={logout}>
              Salir
            </button>
          </div>
        </div>

        {/* Formulario para agregar aulas (solo admin) */}
        {role === "admin" && (
          <form className="aula-add-form" onSubmit={handleAdd}>
            <input
              type="text"
              placeholder="Nombre del aula"
              value={nuevoNombre}
              onChange={(e) => setNuevoNombre(e.target.value)}
              required
            />
            <select
              value={nuevoEstado}
              onChange={(e) => setNuevoEstado(e.target.value)}
            >
              <option value="Limpio">Limpio</option>
              <option value="Sucio">Sucio</option>
            </select>
            <button type="submit" className="btn-login">
              Agregar Aula
            </button>
          </form>
        )}

        {/* Tabla de aulas */}
        <table className="aula-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((aula) => (
              <tr key={aula.id}>
              <td data-label="Nombre">{aula.nombre}</td>
              <td data-label="Estado">{aula.estado}</td>
              <td data-label="Acciones">
              {(role === "admin" || role === "estudiante" || role === "limpieza") && (
              <Link to={`/detalle/${aula.id}`}>
              <button className="btn-login">Ver detalle</button>
              </Link>
            )}

            {role === "admin" && (
            <button
              className="btn-delete"
              onClick={() => handleDelete(aula.id)}
            >
            Eliminar
            </button>
            )}

            {role === "limpieza" && (
              <Link to={`/solicitar/${aula.id}`}>
              <button className="btn-secondary">Solicitar cambio</button>
              </Link>
            )}
            </td>
          </tr>
          ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}
