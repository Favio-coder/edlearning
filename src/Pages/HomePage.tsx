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
                        <a className="navbar-brand" href="#" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", marginLeft: "30px" }}>
                            <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "'Hakuna Sans', sans-serif" }}>
                                Smart
                            </p>
                            <p className="mb-0" style={{ color: "black", fontWeight: "'Hakuna Sans', sans-serif" }}>
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
                                <Button body="Iniciar sesión" backgroundColor="#" color="" />
                                <Button body="Registrate" backgroundColor="#" color="" />
                            </div>
                        </div>
                    </div>
                </nav>
            </header>


            <main className="container" style={{ paddingLeft: "em" }}>
                {/* Añadimos margen superior para el header fijo */}
                <div className="row">
                  <div className="col-12 text-left">
                  <h1 className="font-weight-bold" style={{ 
                           color: "white", 
                           fontFamily: "'Hakuna Sans', sans-serif", 
                           WebkitTextStroke: "1.4px #01A1B7" // Contorno (stroke) de 2px y color #01A1B7
                       }}>
                     FINANZAS
                 </h1>
                  <h1 className="font-weight-bold" style={{ 
                        color: "white", 
                        fontFamily: "'Hakuna Sans', sans-serif", 
                        WebkitTextStroke: "1.4px #01A1B7" // Contorno (stroke) de 2px y color #01A1B7
                        }}>
                       INTELIGENTES PARA
                 </h1>
                  <h1 className="font-weight-bold mb-0" style={{ 
                            color: "white", 
                            fontFamily: "'Hakuna Sans', sans-serif", 
                            WebkitTextStroke: "1.4px #01A1B7" // Contorno (stroke) de 2px y color #01A1B7
                       }}>
                       ESTUDIANTES
                 </h1>
                 </div>
            </div>
                <div className="row mt-5">
                    <div className="col-12 text-left">
                        {/* Ajustamos el contenedor para tener bordes redondeados */}
                        <div
                            className="bg-light py-4 px-3"
                            style={{
                                backgroundColor: "rgba(236, 236, 236, 0.9)", 
                                borderRadius: "15px", // Bordes redondeados moderados
                                display: "inline-block", // Para que el contenedor se ajuste al tamaño del texto
                                padding: "10px 15px", // Ajuste del padding interno
                                border: "1px solid #ECECEC",
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
                    <div className="col-12 text-left">
                    <button className="custom-button">
                        ÚNETE AQUÍ
                    </button>
                    </div>
            </div>
                {/* Imagen alineada a la derecha con mayor tamaño */}
                <div style={{ position: "absolute", right: "4em", top: "12em" }}>
                    <img src="src/assets/images/imagen.png" alt="imagen" style={{ width: "540px", height: "auto" }} />
                </div>

            </main>

        </div>
    );
}

export default HomePage;