import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner, Card, Accordion, ListGroup, Button } from "react-bootstrap";

const CursoPage: React.FC = () => {
  const { idCurso } = useParams<{ idCurso: string }>();
  const [curso, setCurso] = useState<any>(null);
  const [modulos, setModulos] = useState<any[]>([]);
  const [clases, setClases] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCurso = async () => {
      try {
        setLoading(true);
        const cursoResponse = await fetch(`http://localhost:8080/api/curso/${idCurso}`);
        const cursoData = await cursoResponse.json();
        setCurso(cursoData);

        // Obtener los módulos del curso
        const modulosResponse = await fetch(`http://localhost:8080/api/modulo`);
        const modulosData = await modulosResponse.json();
        const modulosFiltrados = modulosData.filter((modulo: any) => modulo.idCurso === parseInt(idCurso!));
        setModulos(modulosFiltrados);

        // Obtener clases de cada módulo
        const clasesResponse = await fetch(`http://localhost:8080/api/clase`);
        const clasesData = await clasesResponse.json();
        const clasesPorModulo: any = {};
        modulosFiltrados.forEach((modulo: any) => {
          clasesPorModulo[modulo.idModulo] = clasesData.filter((clase: any) => clase.idModulo === modulo.idModulo);
        });
        setClases(clasesPorModulo);
      } catch (error) {
        console.error("Error al obtener los datos del curso:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idCurso) {
      fetchCurso();
    }
  }, [idCurso]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!curso) {
    return <p>No se encontraron detalles para este curso.</p>;
  }

  return (
    <div> 
        <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/classes">
              <span style={{ color: "#00A2B6" }}>Smart</span>
              <span style={{ color: "black" }}>Finanzas</span>
            </a>
          </div>
        </nav>
      </header>
    <div className="container mt-5">
      <h2 style={{ color: "white" }}>Detalles del Curso</h2>
      <Card className="mb-4">
        <Card.Body>
          <Card.Title>{curso.nombreCurso || "Curso sin nombre"}</Card.Title>
          <Card.Text>Fecha de Inicio: {new Date(curso.fechaInicio).toLocaleDateString() || "No disponible"}</Card.Text>
          <Card.Text>Estudiantes Matriculados: {curso.estudiantesMatriculados}</Card.Text>
        </Card.Body>
      </Card>

      <h3 style={{ color: "white" }}>Módulos</h3>
      <Accordion>
        {modulos.map((modulo: any) => (
          <Accordion.Item key={modulo.idModulo} eventKey={modulo.idModulo.toString()}>
            <Accordion.Header>{modulo.nombreModulo || "Módulo sin nombre"}</Accordion.Header>
            <Accordion.Body>
              <p>{modulo.descripcion || "Sin descripción"}</p>
              <h5>Clases</h5>
              <ListGroup>
                {clases[modulo.idModulo] && clases[modulo.idModulo].length > 0 ? (
                  clases[modulo.idModulo].map((clase: any) => (
                    <ListGroup.Item key={clase.idClase}>
                      <strong>{clase.nombreClase || "Clase sin nombre"}</strong>
                      <p>{clase.descripcion || "Sin descripción"}</p>
                      {clase.linkClase && (
                        <Button
                          variant="link"
                          href={clase.linkClase}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Ver clase
                        </Button>
                      )}
                    </ListGroup.Item>
                  ))
                ) : (
                  <p>No hay clases disponibles para este módulo.</p>
                )}
              </ListGroup>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
    </div>
  );
};

export default CursoPage;
