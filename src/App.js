import './App.css';
import Card from './components/Card';
function App() {
  return (
     <div className="container">
      <div className="login-card">
        <h1> LIMPIEZA DE AULAS <br /> EPET Nº 20 </h1>
        <img src="" alt="Carro de limpieza" className="icon"/>

        <button className="boton"> INICIAR SESIÓN </button>
        <p className="subtitle"> ¿NO TIENES SESIÓN? </p>
        <button className="boton"> REGISTRARSE </button>
      </div>
    </div>
  );
}
export default App;

