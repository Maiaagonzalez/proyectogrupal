import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import Inicio from "./pages/inicio";
import Registro from "./pages/registro";
import Aulas from "./pages/Aulas";
import RevisarSolicitudes from "./pages/RevisarSolicitudes";
import SolicitarCambio from "./pages/SolicitarCambio";
import Detalle from "./pages/Detalle";
import ProtectedRoute from "./providers/routes/ProtectedRoute";

export default function App() {
  return (
    <AuthProvider>
        <Routes>
          {/* Público */}
          <Route path="/" element={<Inicio />} />
          <Route path="/registro" element={<Registro />} />

          {/* Solo logueados */}
          <Route
            path="/aulas"
            element={
              <ProtectedRoute roles={["admin", "estudiante", "limpieza"]}>
                <Aulas />
              </ProtectedRoute>
            }
          />

          <Route
            path="/detalle/:id"
            element={
              <ProtectedRoute roles={["admin", "estudiante"]}>
                <Detalle />
              </ProtectedRoute>
            }
          />

          <Route
            path="/revisar"
            element={
              <ProtectedRoute roles={["admin"]}>
                <RevisarSolicitudes />
              </ProtectedRoute>
            }
          />

          <Route
            path="/solicitar/:id"
            element={
              <ProtectedRoute roles={["limpieza"]}>
                <SolicitarCambio />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}