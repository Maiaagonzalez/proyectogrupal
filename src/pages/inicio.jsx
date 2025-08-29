import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useAuth } from '../providers/AuthProvider';

export default function Inicio() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate('/aulas');
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/aulas');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-6 col-lg-5">
        <div className="card bg-dark p-4 shadow-lg">
          <h2 className="h4 text-center mb-1">INICIAR SESIÓN</h2>
          <p className="text-center text-secondary mb-4">Accede • Inicia sesión para continuar</p>

          {error && <div className="alert alert-danger py-2">{error}</div>}

          <form onSubmit={handleSubmit} className="d-grid gap-3">
            <div>
              <label className="form-label">Correo electrónico</label>
              <input
                type="email"
                className="form-control"
                placeholder="correo@ejemplo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                placeholder=""
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Acceder</button>
          </form>

          <div className="mt-3 text-center">
            <span className="text-secondary">¿No tienes cuenta?</span>{' '}
            <Link to="/register">Crear una cuenta</Link>
          </div>
        </div>
      </div>
    </div>
  );
}