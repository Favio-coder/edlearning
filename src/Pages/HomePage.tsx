import React from "react";
import Button from "../components/Button";
import "./HomePage.css";

function HomePage() {
    return (
        <div>
            {/* Header de la página */}
            <header className="header">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <p className="brand-name-light">Smart</p>
                            <p className="brand-name-dark">Finanzas</p>
                        </a>
                        <div className="button-container">
                            <Button body="Iniciar sesión" />
                            <Button body="Regístrate" />
                        </div>
                    </div>
                </nav>
            </header>

            <main className="main-section">
                <div>
                    <h1 className="main-title">FINANZAS</h1>
                    <h1 className="main-title">INTELIGENTES PARA</h1>
                    <h1 className="main-title-blue">ESTUDIANTES</h1>
                    <div className="text-main">
                        <p>
                            Es una plataforma educativa diseñada <br />
                            para jóvenes que desean tomar control <br />
                            de su futuro financiero de manera <br />
                            inteligente y accesible.
                        </p>
                    </div>
                    <div className="join-button">
                        <Button body="ÚNETE AQUÍ" />
                    </div>
                </div>
            </main>
        </div>
    );
}

export default HomePage;
