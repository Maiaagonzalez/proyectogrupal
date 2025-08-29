import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Inicio from './pages/inicio';
import Registro from './pages/registro';
import AulaList from './pages/AulaList';
import AulaDetalle from './pages/AulaDetalle';
import ProtectedRoute from './routes/ProtectedRoute';
import { useAuth } from './providers/AuthProvider';

export default function App() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="container py-4">
      <header className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h4 m-0">Limpieza de Aulas • EPET N°20</h1>
        <nav className="d-flex gap-2">
          <Link className="btn btn-outline-light btn-sm" to="/">Inicio</Link>
          {user ? (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/aulas">Aulas</Link>
              <button className="btn btn-danger btn-sm" onClick={() => { logout(); navigate('/'); }}>Salir</button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-light btn-sm" to="/inicio">Iniciar sesión</Link>
              <Link className="btn btn-outline-light btn-sm" to="/registro">Registrarse</Link>
            </>
          )}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<Navigate to={user ? '/aulas' : '/inicio'} />} />
        <Route path="/inicio" element={<Inicio />} />
        <Route path="/registro" element={<Registro />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/aulas" element={<AulaList />} />
          <Route path="/aulas/:id" element={<AulaDetalle />} />
        </Route>
        <Route path="*" element={<p>No encontrado</p>} />
      </Routes>
    </div>
  );
}

