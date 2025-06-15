import React from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const URL = 'http://localhost:5000/api/users/login';

function Login() {
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');

    try {
      const response = await fetch(`${URL}?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
      if (response.ok) {
        const data = await response.json();
        console.log("Respuesta del login:", data);
        if (data && data.authenticated) {
          localStorage.setItem('user', JSON.stringify({ name: data.user.name, _id: data.user._id }));
          alert('¡Login exitoso!');
          navigate('/');
        } else {
          alert('Usuario o contraseña incorrectos');
        }
      } else {
        alert('Usuario o contraseña incorrectos');
      }
    } catch (error) {
      alert('Error al conectar con el servidor');
      console.error('Error de conexión:', error);
    }
  };

  return (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Iniciar Sesión</h2>
      <input type="email" name="email" placeholder="Correo" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit" className='submit-button'>Iniciar Sesión</button>
      <Link to="/"><button type="button" className='exit-button'>Salir</button></Link>
      <p>¿No tienes cuenta?</p>
      <Link to="/register"><button type="button" className='register-button'>Registrate aquí</button></Link>
    </form>
  );
}

export default Login;