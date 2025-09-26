import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./providers/AuthProvider";

import Inicio from "./pages/inicio";
import Registro from "./pages/registro";
import Aulas from "./pages/Aulas";
import AulaDetalle from "./pages/AulaDetalle";
import SolicitarCambio from "./pages/SolicitarCambio";
import RevisarSolicitudes from "./pages/RevisarSolicitudes";

function ProtectedRoute({ children, roles }) {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/" />;

  if (roles && !roles.includes(role)) {
    return <p className="text-center mt-5 text-danger">Acceso denegado</p>;
  }

  return children;
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/registro" element={<Registro />} />

      {/* estudiantes: solo ven nomas */}
      <Route
        path="/aulas"
        element={
          <ProtectedRoute roles={["estudiante", "limpieza", "admin"]}>
            <Aulas />
          </ProtectedRoute>
        }
      />

      {/* limpieza: pone para solicitar cambio */}
      <Route
        path="/solicitar/:id"
        element={
          <ProtectedRoute roles={["limpieza"]}>
            <SolicitarCambio />
          </ProtectedRoute>
        }
      />

      {/* admin: revisa las solicitudes */}
      <Route
        path="/revisar"
        element={
          <ProtectedRoute roles={["admin"]}>
            <RevisarSolicitudes />
          </ProtectedRoute>
        }
      />

      {/* admin:pone el detalle delaula */}
      <Route
        path="/aulas/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AulaDetalle />
          </ProtectedRoute>
        }
      />

      {/* ruta por defecto */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;