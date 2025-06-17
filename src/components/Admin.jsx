import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [reservas, setReservas] = useState([]);
    const [filtroFecha, setFiltroFecha] = useState('');

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user || user.role !== 'admin') {
            alert('Acceso denegado: solo administradores');
            navigate('/');
        }
    }, [navigate]);

    useEffect(() => {
        const fetchReservas = async () => {
            try {
                let url = 'http://localhost:5000/api/reservas';
                if (filtroFecha) {
                    url += `?fecha=${encodeURIComponent(filtroFecha)}`;
                }
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Error en el fetch de reservas');
                }
                const data = await response.json();
                setReservas(data);
            } catch (error) {
                console.error('Error fetching reservas:', error);
            }
        };

        fetchReservas();
    }, [filtroFecha]);

    const handleLogout = () => {
        console.log('User logged out');
        localStorage.removeItem('user');
        navigate('/'); 
    };

    const handleFechaChange = (e) => {
        setFiltroFecha(e.target.value);
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <label>
                Filtrar por fecha:&nbsp;
                <input
                    type="date"
                    value={filtroFecha}
                    onChange={handleFechaChange}
                />
            </label>
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Email</th>
                        <th>Fecha de Reserva</th>
                        <th>Hora de reserva</th>
                    </tr>
                </thead>
                <tbody>
                    {reservas.map((reserva) => (
                        <tr key={reserva._id}>
                            <td>{reserva.usuarioId?.name}</td>
                            <td>{reserva.usuarioId?.email}</td>
                            <td>{reserva.fecha}</td>
                            <td>{`${reserva.horaInicio}-${reserva.horaFin}`}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Admin;