import { Navigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

export default function ProtectedRoute({ children, roles }) {
  const { user, role, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;
  if (!user) return <Navigate to="/" replace />;

  // Si hay roles definidos y el del usuario no está permitido
  if (roles && !roles.includes(role)) {
    return <p>No tenés permiso para acceder a esta página.</p>;
  }

  return children;
}