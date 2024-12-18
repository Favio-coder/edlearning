import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [date, setDate] = useState<string>('');
    const [age, setAge] = useState<number | null>(null);
    const [passwordError, setPasswordError] = useState(false);
    const auth = getAuth();
    const db = getFirestore();
    const navigate = useNavigate();


    function calculateAge() {
        const today = new Date();
        const birth = new Date(date);
        let calculatedAge = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            calculatedAge--;
        }

        setAge(calculatedAge);
    }

    function validatePassword() {
        if (password === confirmPassword) {
            setPasswordError(false);
            return true;
        } else {
            setPasswordError(true);
            return false;
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (validatePassword()) {
            console.log("Datos que se estan enviando a Firebase")
            console.log('Nombre:', nombre);
            console.log('Apellidos:', apellidos);
            console.log('Día de nacimiento:', date);
            console.log('Edad:', age);
            console.log('Correo:', email);
            console.log('Contraseña:', password);
            try{
                const userCredential = await createUserWithEmailAndPassword(auth, email, password)
                const user = userCredential.user

                await setDoc(doc(db,'users', user.uid), {
                    nombre, apellidos, date, age, email,
                })
                alert("Cuenta creada con exito!!")
                
                
                navigate("/login")
            }
            catch(error){
                console.error("Ocurrio un error al crear la cuenta: ", error)
            }
            
        } else {
            console.log('Error: Las contraseñas no coinciden');
        }
        
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="container" style={{ maxWidth: '600px', maxHeight: '80vh', overflowY: 'auto' }}>
                <style>{`
                    ::-webkit-scrollbar {
                        width: 0px;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: rgba(0, 0, 0, 0.5);
                        border-radius: 10px;
                    }
                    ::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .scroll-container {
                        scrollbar-width: thin;
                        scrollbar-color: rgba(0, 0, 0, 0.5) transparent;
                    }
                `}</style>

                <div className="card shadow">
                    <div className="card-body scroll-container">
                        <h2 className="text-center mb-4">Creación de cuenta</h2>

                        {passwordError && (
                            <div className="alert alert-danger" role="alert">
                                Error: Las contraseñas no coinciden.
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="row mb-3">
                                <div className="col">
                                    <label htmlFor="nombre" className="form-label">Nombre</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Nombre"
                                        id="nombre"
                                        value={nombre}
                                        onChange={(e) => setNombre(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="apellidos" className="form-label">Apellidos</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Apellidos"
                                        id="apellidos"
                                        value={apellidos}
                                        onChange={(e) => setApellidos(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="col">
                                    <label htmlFor="diaNacimiento" className="form-label">Fecha de nacimiento</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        id="fechaNacimiento"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>
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
                            <div className="mb-3 position-relative">
                                <label htmlFor="confirmPassword" className="form-label">Repetir contraseña</label>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    className="form-control"
                                    id="confirmPassword"
                                    placeholder="Repetir contraseña"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
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
                            <button onClick={calculateAge} type="submit" className="btn btn-primary w-100">
                                Crear cuenta
                            </button>
                        </form>

                        <Link to="/login" className="icon-link mt-3 d-block text-center">
                            Ya tengo una cuenta registrada
                        </Link>
                        
                        <Link to="/" className="icon-link mt-3 d-block text-center">
                            Volver al inicio
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
