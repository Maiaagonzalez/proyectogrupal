import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AulaDetalle() {
  const { id } = useParams();
  const [aula, setAula] = useState(null);

  useEffect(() => {
    const fetchAula = async () => {
      const ref = doc(db, 'aulas', id);
      const snap = await getDoc(ref);
      if (snap.exists()) setAula({ id: snap.id, ...snap.data() });
    };
    fetchAula();
  }, [id]);

  const toggleEstado = async () => {
    if (!aula) return;
    const nuevo = aula.estado === 'Limpio' ? 'Sucio' : 'Limpio';
    await updateDoc(doc(db, 'aulas', id), { estado: nuevo });
    setAula({ ...aula, estado: nuevo });
  };

  if (!aula) return <p>Cargando...</p>;

  return (
    <div className="card bg-dark p-4 shadow-lg">
      <h2 className="h4 mb-3">Estado de Aula</h2>
      <div className="d-grid gap-2">
        <div className="d-flex justify-content-between">
          <span className="text-secondary">Aula</span>
          <strong>{aula.nombre}</strong>
        </div>
        <div className="d-flex justify-content-between">
          <span className="text-secondary">Estado</span>
          <strong className={aula.estado === 'Limpio' ? 'text-success' : 'text-danger'}>{aula.estado.toUpperCase()}</strong>
        </div>
        <div className="mt-3 d-flex gap-2">
          <button className="btn btn-primary" onClick={toggleEstado}>Cambiar estado</button>
          <Link className="btn btn-outline-light" to="/aulas">Volver a lista</Link>
        </div>
      </div>
    </div>
  );
}