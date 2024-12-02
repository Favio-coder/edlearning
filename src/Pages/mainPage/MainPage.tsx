import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaChalkboardTeacher, FaBook, FaClipboardList, FaFileAlt, FaComments, FaCalculator } from 'react-icons/fa';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

function MainPage() {
    const { user, logout } = useAuth();
    const [userData, setUserData] = useState<any>(null);
    const [cursos, setCursos] = useState([]);
    const db = getFirestore();
    const navigate = useNavigate();

    
    // Fetch user data from Firestore
    useEffect(() => {
        const getUserData = async () => {
            if (user) {
                const docRef = doc(db, 'users', user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setUserData(docSnap.data());
                } else {
                    console.log('No se encontró el documento');
                }
            }
        };
        getUserData();
    }, [user, db]);

    // Fetch courses from API
    useEffect(() => {
        axios.get('http://localhost:8080/api/curso')
            .then(response => {
                console.log(response);
                setCursos(response.data);
            })
            .catch(error => {
                console.error("Hubo un error al obtener los cursos: ", error);
                console.error("La base de datos está desactivada");
            });
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate('/login'); // Redirige al usuario a la página de inicio de sesión
        } catch (error) {
            console.error("Error al cerrar sesión: ", error);
        }
    };

    return (
        <div>
            {/* Barra de navegación fija en la parte superior */}
            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                            <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "bold" }}>Smart</p>
                            <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>Finanzas</p>
                        </a>

                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {userData ? userData.nombre : "Cargando..."}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li><Link className="dropdown-item" to="/profile/edit">Editar perfil</Link></li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li><button className="dropdown-item" onClick={handleLogout}>Cerrar sesión</button></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="d-flex flex-column flex-md-row" style={{ marginTop: "60px", height: "calc(100vh - 60px)", overflow: "hidden" }}>
                {/* Barra de navegación lateral */}
                <div className="sidebar d-none d-md-block p-4" style={{ minWidth: "200px", backgroundColor: "#f8f9fa", borderRight: "2px solid #000" }}>
                    <ul className="list-group">
                        <li className="list-group-item item" style={{ marginTop: "20px", border: "solid 3px black" }}>
                            <Link to="/classes" style={{ color: "black" }}><FaChalkboardTeacher className="me-2" style={{ fontSize: '1.5rem' }} /> Cursos</Link>
                        </li>

                        <li className="list-group-item item" style={{ marginTop: "20px", border: "solid 3px black" }}>
                            <Link to="/exams" style={{ color: "black" }}><FaClipboardList className="me-2" style={{ fontSize: '1.5rem' }} /> Exámenes</Link>
                        </li>
                        <li className="list-group-item item" style={{ marginTop: "20px", border: "solid 3px black" }}>
                            <Link to="/glosary" style={{ color: "black" }}><FaFileAlt className="me-2" style={{ fontSize: '1.5rem' }} /> Glosario</Link>
                        </li>
                        <li className="list-group-item item" style={{ marginTop: "20px", border: "solid 3px black" }}>
                            <Link to="/messages" style={{ color: "black" }}><FaComments className="me-2" style={{ fontSize: '1.5rem' }} /> Mensajería</Link>
                        </li>
                        <li className="list-group-item item" style={{ marginTop: "20px", border: "solid 3px black" }}>
                            <Link to="/calculator" style={{ color: "black" }}><FaCalculator className="me-2" style={{ fontSize: '1.5rem' }} /> Calculadora</Link>
                        </li>
                    </ul>
                </div>

                {/* Sección central donde se mostrarán los cursos */}
                <div className="content flex-grow-1 p-3 p-md-5" style={{ overflowY: "auto" }}>
                    <h2>Cursos Disponibles</h2>
                    {/* Mapeamos los cursos obtenidos del API */}
                    {cursos.length > 0 ? (
                        cursos.map((curso: any) => (
                            <div key={curso.idCurso} className="curso-item card mb-3">
                                <div className="card-body">
                                    <h3 className="card-title">{curso.nombreCurso}</h3>
                                    <p className="card-text">
                                        Fecha de Publicación: {new Date(curso.fechaInicio).toLocaleDateString()} <br />
                                        {curso.imagenReferencial} <br />
                                        
                                    </p>
                                    
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No hay cursos disponibles en este momento.</p>
                    )}
                </div>

            </div>

            {/* Barra de navegación inferior para móviles */}
            <nav className="navbar navbar-expand-lg navbar-light bg-light d-md-none fixed-bottom">
                <div className="container-fluid">
                    <ul className="navbar-nav mx-auto flex-row">
                        <li className="nav-item">
                            <Link className="nav-link" to="/classes"><FaChalkboardTeacher style={{ fontSize: '1.5rem' }} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/practices"><FaBook style={{ fontSize: '1.5rem' }} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/exams"><FaClipboardList style={{ fontSize: '1.5rem' }} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/resources"><FaFileAlt style={{ fontSize: '1.5rem' }} /></Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/messages"><FaComments style={{ fontSize: '1.5rem' }} /></Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}

export default MainPage;
