import { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../providers/AuthProvider";
import AltaDato from "../components/AltaDato";
import { Link, useNavigate } from "react-router-dom";

export default function Aulas() {
  const [aulas, setAulas] = useState([]);
  const { role, logout } = useAuth();
  const navigate = useNavigate();

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

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Gestión de Aulas</h1>
        <button className="btn-logout" onClick={handleLogout}>
          Salir
        </button>
      </header>

      {/* Solo admin puede dar de alta aulas */}
      {role === "admin" && (
        <div className="alta-container">
          <AltaDato onAdd={cargarDatos} />
        </div>
      )}

      <div className="aulas-list">
        {aulas.length === 0 ? (
          <p className="empty-text">No hay aulas cargadas.</p>
        ) : (
          aulas.map((a) => (
            <div key={a.id} className="aula-card">
              <div className="aula-info">
                <h3>{a.nombre}</h3>
                <p>
                  Estado:{" "}
                  <span
                    className={`badge ${
                      a.estado === "Limpio" ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {a.estado}
                  </span>
                </p>
              </div>

              <div className="aula-actions">
                {/* Limpieza puede solicitar cambios */}
                {role === "limpieza" && (
                  <Link to={/solicitar/${a.id}} className="btn-warning">
                    Solicitar cambio
                  </Link>
                )}

                {/* Admin puede eliminar aulas */}
                {role === "admin" && (
                  <button
                    className="btn-danger"
                    onClick={() => eliminarAula(a.id)}
                  >
                    Eliminar
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}