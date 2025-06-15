import React from 'react';
import './Contacto.css';
import { Link } from 'react-router-dom';

function Contacto() {
  return (
    <>
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form className="contacto-form">
        <input type="text" placeholder="Tu nombre" required />
        <input type="email" placeholder="Tu correo" required />
        <textarea placeholder="Tu mensaje" required />
        <button type="submit">Enviar</button>
      </form>
      <div className="contacto-info">
        <p>Correo: info@canchaschichas.com</p>
        <p>Teléfono: +54 11 1234-5678</p>
      </div>
    </div>
    <Link to="/">
      <button className='exit-button'>Salir</button>
    </Link>
    </>
  );
}

export default Contacto;