import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();  // Hook para la navegación programática

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await auth?.login(email, password);
            alert("Inicio de sesión exitoso!!")
            navigate('/authenticated');  
        } catch (error) {
            alert("No se pudo iniciar sesión")
            console.error('Error de inicio de sesión:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" >
            <div className="container" style={{ maxWidth: '800px', backgroundColor: '#fff', borderRadius: '15px'}}>
                <div className="row shadow" style={{ backgroundColor: '#fff', borderRadius:"15px"}}>
                    {/* Columna para el formulario */}
                    <div className="col-md-6 p-4">
                        <h2 className="text-center mb-4">Inicio de sesión</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Correo Electrónico</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="Correo electrónico"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3 position-relative">
                                <label htmlFor="password" className="form-label">Contraseña</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="password"
                                    placeholder="Contraseña"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <span
                                    className="position-absolute"
                                    style={{ right: '10px', top: '38.5px', cursor: 'pointer' }}
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                                </span>
                            </div>
                            <button type="submit" className="btn btn-primary w-100">Iniciar sesión</button>
                        </form>
                        <Link to="/register" className="icon-link mt-3 d-block text-center">
                            No tengo una cuenta registrada
                        </Link>
                        
                        <Link to="/" className="icon-link mt-3 d-block text-center">
                            Volver al inicio
                        </Link>
                    </div>
                    {/* Columna para la imagen */}
                    <div className="col-md-6 p-0">
                        <img
                            src="src/assets/images/imagen.png"  // URL de tu imagen
                            alt="Descripción de la imagen"
                            className="img-fluid h-100 w-100"
                            style={{ objectFit: 'cover' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoginPage;
