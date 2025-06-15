import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import './App.css'
import Carrousel from './components/Carrousel'
import logo from './assets/logoFutbol.png' 

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <>
      <header className='navbar'>
        <div className="navbar-content">
          <div className="navbar-logo">
            <img src={logo} alt="Logo" />
            <span>Canchas Chichas</span>
          </div>
          <nav className='navbar-links'>
            {!user ? (
              <>
                <Link to="/login">Iniciar Sesión</Link>
              </>
            ) : (
              <>
                <span>Bienvenido/a, {user.name}</span>
                <Link to="/" onClick={handleLogout}>Cerrar Sesión</Link>
              </>
            )}
            <Link to="/reservar">Reservar cancha</Link>
            <Link to="/contacto">Contacto</Link>
          </nav>
        </div>
      </header>
      <div className='main'>
        <h1>¡Bienvenido a canchas chichas!</h1>
        <h2>¡Las mejores canchas de palermo!</h2>
        <div className="carrousel">
          <Carrousel />
        </div>
      </div>
    </>
  )
}

export default App