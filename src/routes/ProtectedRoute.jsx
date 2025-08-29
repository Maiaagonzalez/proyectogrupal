import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();
  if (loading) return <p>Cargando...</p>;
  return user ? <Outlet /> : <Navigate to="/inicio" replace />;
}
