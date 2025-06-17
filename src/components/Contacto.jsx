import React from 'react';
import './Contacto.css';
import { Link } from 'react-router-dom';

function Contacto() {

  function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const nombre = formData.get('nombre');
    const email = formData.get('email');
    const mensaje = formData.get('mensaje');

    
    console.log('Datos del formulario:', { nombre, email, mensaje });
    alert(`Gracias por tu mensaje, ${nombre}! Nos pondremos en contacto contigo pronto.`);
    event.target.reset(); 
  }



  return (
    <>
    <div className="contacto-container">
      <h2>Contacto</h2>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <input type="text" name = "nombre" placeholder="Tu nombre" required />
        <input type="email" name = "email" placeholder="Tu correo" required />
        <textarea name = "mensaje" placeholder="Tu mensaje" required />
        <button type="submit" >Enviar</button>
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