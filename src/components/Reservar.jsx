import React from 'react';
import './Reservar.css';
import { Link } from 'react-router-dom';
import ComboCanchas from './comboCanchas';

function ReservarCancha() {

  React.useEffect(() => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Por favor, inicia sesión para reservar una cancha.');
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error al verificar el usuario:', error);
      alert('Error al verificar la sesión. Por favor, inicia sesión nuevamente.');
      window.location.href = '/login';
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    try {
      const formData = new FormData(event.target);
      const reservationData = Object.fromEntries(formData.entries());

      // Obtén el usuario logueado
      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        alert('Por favor, inicia sesión para reservar una cancha.');
        window.location.href = '/login';
        return;
      }

      reservationData.usuarioId = user._id;

      fetch('http://localhost:5000/api/reservas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error en la reserva');
          }
          return response.json();
        })
        .then(data => {
          alert(`Reserva realizada con éxito: ${data.fecha} a las ${data.horaInicio} - ${data.horaFin}`);
          console.log('Reserva exitosa:', data);
          event.target.reset();
        })
        .catch(error => {
          console.error('Error al procesar la reserva:', error);
          alert('Error al procesar la reserva. Por favor, inténtalo de nuevo más tarde.');
        });
    } catch (error) {
      console.error('Error al procesar la reserva:', error);
      alert('Error al procesar la reserva. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  return (
    <>
      <div className="reservar-container">
        <h2>Reservar Cancha</h2>
        <form className="reservar-form" onSubmit={handleSubmit}>
          <label htmlFor="fecha">Fecha:</label>
          <input type="date" name="fecha" required />
          <label htmlFor="horaInicio">Hora de Inicio:</label>
          <input type="time" name="horaInicio" required />
          <label htmlFor="horaFin">Hora de Fin:</label>
          <input type="time" name="horaFin" required />
          <label htmlFor="canchaId">Selecciona una cancha:</label>
          <ComboCanchas name="canchaId" />
          <button type="submit">Reservar</button>
        </form>
      </div>
      <Link to="/">
        <button className='exit-button'>Salir</button>
      </Link>
    </>
  );
}

export default ReservarCancha;