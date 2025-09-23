import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate, Link } from "react-router-dom";

export default function RevisarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const cargarSolicitudes = async () => {
    const snapshot = await getDocs(collection(db, "solicitudes"));
    setSolicitudes(snapshot.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  useEffect(() => {
    cargarSolicitudes();
  }, []);

  const manejarSolicitud = async (solicitud, aceptar) => {
    const solicitudRef = doc(db, "solicitudes", solicitud.id);

    if (aceptar) {
      await updateDoc(doc(db, "aulas", solicitud.aulaId), {
        estado: solicitud.estadoSolicitado,
      });
      await updateDoc(solicitudRef, { estadoSolicitud: "aceptada" });
    } else {
      await updateDoc(solicitudRef, { estadoSolicitud: "rechazada" });
    }

    cargarSolicitudes();
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1>Revisar Solicitudes</h1>
        <div className="d-flex gap-2">
          <Link to="/aulas" className="btn-outline-primary">
            Ir a Aulas
          </Link>
          <button className="btn-logout" onClick={handleLogout}>
            Salir
          </button>
        </div>
      </header>

      {solicitudes.length === 0 ? (
        <p className="empty-text">No hay solicitudes.</p>
      ) : (
        <div className="solicitudes-list">
          {solicitudes.map((s) => (
            <div key={s.id} className="solicitud-card">
              <div className="solicitud-info">
                <h3>Aula: {s.aulaId}</h3>
                <p>
                  Estado actual:{" "}
                  <span className="badge badge-secondary">{s.estadoActual}</span>
                </p>
                <p>
                  Solicitado:{" "}
                  <span
                    className={`badge ${
                      s.estadoSolicitado === "Limpio"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {s.estadoSolicitado}
                  </span>
                </p>
                <p>
                  Estado de la solicitud:{" "}
                  <span
                    className={`badge ${
                      s.estadoSolicitud === "pendiente"
                        ? "badge-warning"
                        : s.estadoSolicitud === "aceptada"
                        ? "badge-success"
                        : "badge-danger"
                    }`}
                  >
                    {s.estadoSolicitud}
                  </span>
                </p>
              </div>

              {s.estadoSolicitud === "pendiente" && (
                <div className="solicitud-actions">
                  <button
                    className="btn-success"
                    onClick={() => manejarSolicitud(s, true)}
                  >
                    Aceptar
                  </button>
                  <button
                    className="btn-danger"
                    onClick={() => manejarSolicitud(s, false)}
                  >
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}