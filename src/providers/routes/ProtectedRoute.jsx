import { Navigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user, role } = useAuth();

  // Si no hay usuario, redirige al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Si hay roles definidos, verifica que el actual esté permitido
  if (allowedRoles && !allowedRoles.includes(role)) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "linear-gradient(135deg, #357ab8, #4a90e2)",
          color: "white",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <h2>Acceso denegado</h2>
        <p>No tenés permisos para acceder a esta página.</p>
      </div>
    );
  }

  // Si todo está bien, renderiza el contenido
  return children;
}
