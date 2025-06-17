import React, { useState, useEffect } from 'react';
import './ComboCanchas.css';

function ComboCanchas(props) {
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
      name={props.name || "canchaId"}
      value={canchaSeleccionada}
      onChange={e => setCanchaSeleccionada(e.target.value)}
      required
    >
      <option value="">Seleccione una cancha</option>
      {canchas.map(cancha => (
        <option key={cancha._id} value={cancha._id}>
          {cancha.nombre}
        </option>
      ))}
    </select>
  );
}

export default ComboCanchas;