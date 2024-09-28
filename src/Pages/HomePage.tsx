import React from "react";
import Button from "../components/Button";
import "./HomePage.css";

function HomePage() {
    return (
        <div>
            {/* Header de la página */}
            <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
                <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ padding: 0, margin: 0 }}>
                    <div className="container-fluid" style={{ paddingLeft: 0, paddingRight: 0 }}>
                        <a className="navbar-brand" href="#" style={{ marginLeft: "30px", textAlign: "left" }}>
                            <p
                                style={{
                                    marginBottom: 0,
                                    color: "#00A2B6",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    margin: 0 // Eliminar márgenes por defecto
                                }}
                            >
                                Smart
                            </p>
                            <p
                                style={{
                                    marginTop: 0,
                                    color: "black",
                                    fontWeight: "bold",
                                    textAlign: "left",
                                    margin: 0 // Eliminar márgenes por defecto
                                }}
                            >
                                Finanzas
                            </p>
                        </a>
                        <div style={{ display: "flex", gap: "10px", marginRight: "30px" }}>
                            <Button body="Iniciar sesión" backgroundColor="#A8A8A8" color="white" />
                            <Button body="Registrate" backgroundColor="#00A2B6" color="white" />
                        </div>
                    </div>
                </nav>
            </header>

            <main style={{ textAlign: "left", marginLeft: "4px" }}> {/* Ajuste aquí */}
                <div>
                    <div className="title-main" style={{ marginLeft: "1px" }}>
                        <h1
                            style={{
                                color: "black",
                                fontWeight: "bold",
                                fontSize: "60px",
                                marginBottom: "0px"
                            }}
                        >
                            HECHO PARA ESTUDIANTES
                        </h1>
                        <h1 
                            style={{
                                color: "#005A66",
                                fontWeight: "bold",
                                fontSize: "60px",
                                marginTop: "0px"
                            }}
                        >
                            FINANCIEROS
                        </h1>
                    </div>
                    <div style={{ marginTop: "50px" }}></div>
                    <div className="text-main" style={{ background: "#D9D9D9", padding: "0px" }}>
                        <p style={{ fontWeight: "500" }}>
                            Es una plataforma educativa diseñada <br />
                            para jóvenes que desean tomar control <br />
                            de su futuro financiero de manera <br />
                            inteligente y accesible.
                        </p>
                    </div>
                    <Button body="ÚNETE AQUI" backgroundColor="#007180" color="white" />
                </div>
            </main>
        </div>
    );
}

export default HomePage;
