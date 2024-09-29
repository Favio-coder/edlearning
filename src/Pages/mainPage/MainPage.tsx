import { Link } from 'react-router-dom';
import './MainPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { FaChalkboardTeacher, FaBook, FaClipboardList, FaFileAlt, FaComments } from 'react-icons/fa';

function MainPage() {
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

                        {/* Botón para colapsar la navbar en pantallas pequeñas */}
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>

                        {/* Contenido del navbar */}
                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav ms-auto">
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        {"Richard Favio Asturimac Medina"}
                                    </a>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                        <li>
                                            <Link className="dropdown-item" to="/profile/edit">Editar perfil</Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link className="dropdown-item" to="/logout">Cerrar sesión</Link>
                                        </li>
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
                        <li className="list-group-item"
                            style={{
                                marginTop: "20px",
                                border: "solid 3px black"
                            }}>
                            <Link to="/classes" style={{ color: "black" }}><FaChalkboardTeacher className="me-2" style={{ fontSize: '1.5rem' }} /> Clases</Link>
                        </li>
                        <li className="list-group-item"
                            style={{
                                marginTop: "20px",
                                border: "solid 3px black"
                            }}>
                            <Link to="/practices" style={{ color: "black" }}><FaBook className="me-2" style={{ fontSize: '1.5rem' }} /> Prácticas</Link>
                        </li>
                        <li className="list-group-item"
                            style={{
                                marginTop: "20px",
                                border: "solid 3px black"
                            }}>
                            <Link to="/exams" style={{ color: "black" }}><FaClipboardList className="me-2" style={{ fontSize: '1.5rem' }} /> Exámenes</Link>
                        </li>
                        <li className="list-group-item"
                            style={{
                                marginTop: "20px",
                                border: "solid 3px black"
                            }}>
                            <Link to="/resources" style={{ color: "black" }}><FaFileAlt className="me-2" style={{ fontSize: '1.5rem' }} /> Recursos adicionales</Link>
                        </li>
                        <li className="list-group-item"
                            style={{
                                marginTop: "20px",
                                border: "solid 3px black"
                            }}>
                            <Link to="/messages" style={{ color: "black" }}><FaComments className="me-2" style={{ fontSize: '1.5rem' }} /> Mensajería</Link>
                        </li>
                    </ul>
                </div>

                {/* Sección central */}
                <div className="content flex-grow-1 p-3 p-md-5" style={{ overflowY: "auto" }}>
                    <h2>Noticias Destacadas</h2>
                    <div className="news-section">
                        <p>Aquí puedes mostrar las noticias destacadas, eventos y otra información relevante.</p>
                    </div>
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
