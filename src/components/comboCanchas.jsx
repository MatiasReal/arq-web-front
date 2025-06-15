import React, { useState, useEffect } from 'react';
import './ComboCanchas.css'; 
function ComboCanchas() {
  const [canchas, setCanchas] = useState([]);
  const [canchaSeleccionada, setCanchaSeleccionada] = useState('');

  useEffect(() => {
    fetch('/api/canchas')
      .then(res => res.json())
      .then(data => setCanchas(data));
  }, []);

  return (
    <select
      className="form-select"
      value={canchaSeleccionada}
      onChange={e => setCanchaSeleccionada(e.target.value)}
    >
      <option value="">Seleccione una cancha</option>
      {canchas.map(cancha => (
        <option key={cancha._id} value={cancha.nombre}>
          {cancha.nombre}
        </option>
      ))}
    </select>
  );
}

export default ComboCanchas;