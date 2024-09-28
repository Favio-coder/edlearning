import Button from "../components/Button";
import "./HomePage.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min'

function HomePage() {
    return (
        <div>

            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>

                            <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "bold" }}>
                                Smart
                            </p>
                            <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>
                                Finanzas
                            </p>
                        </a>
                        <button
                            className="navbar-toggler"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarResponsive"
                            aria-controls="navbarResponsive"
                            aria-expanded="false"
                            aria-label="Toggle navigation"
                        >
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarResponsive">
                            <div className="ms-auto d-flex gap-2">
                                <Button body="Iniciar sesión" backgroundColor="#A8A8A8" color="white" />
                                <Button body="Registrate" backgroundColor="#00A2B6" color="white" />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


            <main className="container" style={{ marginTop: "80px" }}>
                {/* Añadimos margen superior para el header fijo */}
                <div className="row">
                    <div className="col-12 text-center">
                        <h1 className="display-4 font-weight-bold mb-0" style={{ color: "white" }}>
                            FINANZAS INTELIGENTES PARA ESTUDIANTES
                        </h1>
                    </div>
                </div>

                <div className="row mt-5">
                    <div className="col-12 text-center">
                        {/* Ajustamos el contenedor para tener bordes redondeados */}
                        <div
                            className="bg-light py-4 px-3"
                            style={{
                                backgroundColor: "#D9D9D9",
                                borderRadius: "15px", // Bordes redondeados moderados
                                display: "inline-block", // Para que el contenedor se ajuste al tamaño del texto
                                padding: "20px", // Ajuste del padding interno
                            }}
                        >
                            <p className="font-weight-medium mb-0">
                                Es una plataforma educativa diseñada <br />
                                para jóvenes que desean tomar control <br />
                                de su futuro financiero de manera <br />
                                inteligente y accesible.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="row mt-4">
                    <div className="col-12 text-center">
                        <Button body="ÚNETE AQUÍ" backgroundColor="#007180" color="white" />
                    </div>
                </div>
            </main>

        </div>
    );
}

export default HomePage;
