import React from 'react';
import './style.css';

const LoginForm = () => {
  return (
    <div className="container">
      <h1>Accede</h1>
      <p>Inicia sesión para continuar</p>

      <form>
        <label htmlFor="email">CORREO ELECTRÓNICO</label>
        <input
          type="email"
          id="email"
          placeholder="Ingrese su Correo Electrónico"
          required
        />

        <label htmlFor="password">CLAVE</label>
        <input
          type="password"
          id="password"
          placeholder="Ingrese su clave"
          required
        />

        <button type="submit">Accede</button>
      </form>
    </div>
  );
};

export default LoginForm;
