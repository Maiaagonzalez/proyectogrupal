import { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebaseConfig"; 

export default function RevisarSolicitudes() {
  const [solicitudes, setSolicitudes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerSolicitudes = async () => {
      const solicitudesRef = collection(db, "solicitudes");
      const snapshot = await getDocs(solicitudesRef);

      const lista = await Promise.all(
        snapshot.docs.map(async (docu) => {
          const data = docu.data();
          const aulaId = data.aulaId; 
          let nombreAula = "";
          let estadoActual = "";

          if (aulaId) {
            try {
              const aulaRef = doc(db, "aulas", aulaId);
              const aulaSnap = await getDoc(aulaRef);
              if (aulaSnap.exists()) {
                const aulaData = aulaSnap.data();
                nombreAula = aulaData.nombre || `Aula ${aulaId}`;
                estadoActual = aulaData.estado || "Sin estado";
              }
            } catch (err) {
              console.error("Error al obtener aula:", err);
            }
          }

          return {
            id: docu.id,
            nombreAula,
            estadoActual,
            solicitadoPor: data.solicitadoPor || "Desconocido",
            nuevoEstado: data.nuevoEstado || "No especificado",
            estadoSolicitud: data.estado || "pendiente",
            aulaId,
          };
        })
      );

      const pendientes = lista.filter((s) => s.estadoSolicitud === "pendiente");
      setSolicitudes(pendientes);
    };

    obtenerSolicitudes();
  }, []);

  const manejarDecision = async (id, decision, aulaId, nuevoEstado) => {
    const solicitudRef = doc(db, "solicitudes", id);
    await updateDoc(solicitudRef, { estado: decision });

    if (decision === "aceptada" && aulaId && nuevoEstado) {
      const aulaRef = doc(db, "aulas", aulaId);
      await updateDoc(aulaRef, { estado: nuevoEstado });
    }

    setSolicitudes((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="revisar-container">
      <div className="revisar-header">
        <h2>Revisar Solicitudes</h2>
        <div className="revisar-buttons">
          <button onClick={() => navigate("/aulas")} className="btn-secundario">
            Aulas
          </button>
          <button
            onClick={async () => {
              try {
               await signOut(auth); // 👈 cerrar sesión en Firebase
                navigate("/home"); // 👈 redirigir al login
              } catch (error) {
                console.error("Error al cerrar sesión:", error);
              }
          }}
               className="btn-salir"
              >
              Salir
          </button>
        </div>
      </div>

      {solicitudes.length === 0 ? (
        <p className="revisar-vacio">No hay solicitudes pendientes</p>
      ) : (
        <div className="revisar-lista">
          {solicitudes.map((s) => (
            <div key={s.id} className="revisar-card">
              <h3>{s.nombreAula}</h3>
              <p>
                <strong>Solicitado por:</strong> {s.solicitadoPor}
              </p>
              <p>
                <strong>Estado actual:</strong> {s.estadoActual}
              </p>
              <p>
                <strong>Cambiar a:</strong> {s.nuevoEstado}
              </p>

              <div className="revisar-acciones">
                <button
                  className="btn-aceptar"
                  onClick={() =>
                    manejarDecision(s.id, "aceptada", s.aulaId, s.nuevoEstado)
                  }
                >
                  Aceptar
                </button>
                <button
                  className="btn-rechazar"
                  onClick={() =>
                    manejarDecision(s.id, "rechazada", s.aulaId, s.nuevoEstado)
                  }
                >
                  Rechazar
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}