import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Nuevo estado para mostrar/ocultar contraseña

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Correo:", email);
        console.log("Contraseña:", password);
    };

    return (
        <div className="container" style={{ maxWidth: '400px', marginTop: '100px' }}>
            <div className="card shadow">
                <div className="card-body">
                    <h2 className="text-center mb-4">Inicio de sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Correo Electrónico</label>
                            <input
                                type="email"
                                className="form-control"
                                placeholder='Correo electrónico'
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3 position-relative">
                            <label htmlFor="password" className="form-label">Contraseña</label>
                            <input
                                type={showPassword ? 'text' : 'password'} // Cambia el tipo según el estado
                                className="form-control"
                                id="password"
                                placeholder='Contraseña'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <span
                                className="position-absolute"
                                style={{ right: '10px', top: '38.5px', cursor: 'pointer' }}
                                onClick={() => setShowPassword(!showPassword)} // Cambia el estado al hacer clic
                            >
                                <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                            </span>
                        </div>
                        <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
                    </form>
                    <Link to="/Register" className="icon-link">
                        Ya tengo una cuenta creada
                    </Link>

                </div>
            </div>
        </div>
    );
}

export default LoginPage;
