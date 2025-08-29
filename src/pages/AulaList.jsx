import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function AulaList() {
  const [aulas, setAulas] = useState([]);

  useEffect(() => {
    const fetchAulas = async () => {
      const snap = await getDocs(collection(db, 'aulas'));
      setAulas(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    };
    fetchAulas();
  }, []);

  return (
    <div className="card bg-dark p-4 shadow-lg">
      <h2 className="h4 mb-3">Lista de Aulas</h2>
      <div className="table-responsive">
        <table className="table table-dark table-hover align-middle">
          <thead>
            <tr>
              <th>Aula</th>
              <th>Estado</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {aulas.map((a) => (
              <tr key={a.id}>
                <td>{a.nombre}</td>
                <td>
                  <span className={'badge ' + (a.estado === 'Limpio' ? 'badge-clean' : 'badge-dirty')}>{a.estado}</span>
                </td>
                <td><Link className="btn btn-outline-light btn-sm" to={`/aulas/${a.id}`}>Ver estado</Link></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
