import React from "react";
import "./Register.css";
const URL = "http://localhost:5000/api/users";
import { Link } from "react-router-dom";

function Register() {
  const handleRegister = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }

      const data = await response.json();
      alert("Bienvenido/a, " + data.name);
      event.target.reset();
      console.log("Respuesta del servidor:", data);
    } catch (error) {
      console.error("Error al registrarse:", error);
    }
  };

  return (
    <form className="register-form" onSubmit={handleRegister}>
      <h2>Registrarse</h2>
      <input type="text" name="name" placeholder="Usuario" required />
      <input type="email" name="email" placeholder="Correo" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Registrarse</button>
      <Link to="/login" className="exit-button">Atrás</Link>
      <Link to="/" className="exit-button">Salir</Link>
    </form>
  );
}

export default Register;