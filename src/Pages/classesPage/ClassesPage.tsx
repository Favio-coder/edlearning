import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

// Componente CrearCurso
const CrearCurso: React.FC = () => {
  const [show, setShow] = useState(false);
  const [step, setStep] = useState(1);
  const [curso, setCurso] = useState({
    nombreCurso: "",
    fechaInicio: "",
    estudiantesMatriculados: 0,
    modulos: [],
    tipoCurso: [1],
    imagenReferencial: null as File | null,
  });

  const [modulos, setModulos] = useState<
    { idModulo: number; nombreModulo: string; descripcion: string; estadoModulo: boolean }[]
  >([]);
  const [clases, setClases] = useState<
    { idModulo: number; clases: { nombreClase: string; descripcion: string; estadoClase: boolean; linkClase: string }[] }[]
  >([]);
  const [cursosDisponibles, setCursosDisponibles] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleCursoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCurso((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddModulo = (cantidad: number) => {
    const nuevosModulos = Array.from({ length: cantidad }, (_, i) => ({
      idModulo: modulos.length + i + 1,
      nombreModulo: "",
      descripcion: "",
      estadoModulo: true,
    }));
    setModulos(nuevosModulos);
  };

  const handleModuloChange = (index: number, field: string, value: string) => {
    const nuevosModulos = [...modulos];
    nuevosModulos[index] = { ...nuevosModulos[index], [field]: value };
    setModulos(nuevosModulos);
  };

  const handleAddClase = (idModulo: number) => {
    const moduloClases = clases.find((m) => m.idModulo === idModulo) || { idModulo, clases: [] };
    moduloClases.clases.push({ nombreClase: "", descripcion: "", estadoClase: true, linkClase: "" });
    setClases((prev) => [...prev.filter((m) => m.idModulo !== idModulo), moduloClases]);
  };

  const handleClaseChange = (idModulo: number, index: number, field: string, value: string | boolean) => {
    const moduloClases = clases.find((m) => m.idModulo === idModulo) || { idModulo, clases: [] };
    moduloClases.clases[index] = { ...moduloClases.clases[index], [field]: value };
    setClases((prev) => [...prev.filter((m) => m.idModulo !== idModulo), moduloClases]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setCurso((prev) => ({ ...prev, imagenReferencial: file ? file : null }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const cursoResponse = await fetch("http://localhost:8080/api/curso", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(curso),
      });
      const cursoData = await cursoResponse.json();
      const idCurso = cursoData.idCurso;

      for (const modulo of modulos) {
        const moduloResponse = await fetch("http://localhost:8080/api/modulo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...modulo, idCurso }),
        });
        const moduloData = await moduloResponse.json();
        const idModulo = moduloData.idModulo;

        const moduloClases = clases.find((m) => m.idModulo === modulo.idModulo);
        if (moduloClases) {
          for (const clase of moduloClases.clases) {
            await fetch("http://localhost:8080/api/clase", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...clase, idModulo }),
            });
          }
        }
      }

      alert("Curso creado exitosamente.");
      setShow(false);
      setStep(1);
      setCurso({
        nombreCurso: "",
        fechaInicio: "",
        estudiantesMatriculados: 0,
        modulos: [],
        tipoCurso: [1],
        imagenReferencial: null,
      });
      setModulos([]);
      setClases([]);
    } catch (error) {
      console.error("Error al crear el curso:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCursos = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/curso");
      const data = await response.json();
      setCursosDisponibles(data);
    } catch (error) {
      console.error("Error al obtener cursos:", error);
    }
  };

  useEffect(() => {
    fetchCursos();
  }, []);

  return (
    <>
      <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
            <a className="navbar-brand" href="/authenticated">
              <span style={{ color: "#00A2B6" }}>Smart</span>
              <span style={{ color: "black" }}>Finanzas</span>
            </a>
          </div>
        </nav>
      </header>

      <div className="container mt-5">
        <Button variant="primary" onClick={() => setShow(true)}>
          Agregar Curso
        </Button>
        <h2 className="mt-4">Cursos Disponibles</h2>
        <Row>
          {cursosDisponibles.map((curso) => (
            <Col md={4} key={curso.idCurso}>
              <Card>
                <Card.Body>
                  <Card.Title>{curso.nombreCurso}</Card.Title>
                  <Card.Text>Fecha de Inicio: {new Date(curso.fechaInicio).toLocaleDateString()}</Card.Text>
                  <Button onClick={() => navigate(`/curso/${curso.idCurso}`)}>Ver Detalles</Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      <Modal show={show} onHide={() => setShow(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Crear Curso</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {step === 1 && (
            <>
              <h5>Información del Curso</h5>
              <Form.Group>
                <Form.Label>Nombre del Curso</Form.Label>
                <Form.Control
                  type="text"
                  name="nombreCurso"
                  placeholder="Nombre del curso"
                  value={curso.nombreCurso}
                  onChange={handleCursoChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Fecha de Inicio</Form.Label>
                <Form.Control type="date" name="fechaInicio" value={curso.fechaInicio} onChange={handleCursoChange} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Imagen Referencial</Form.Label>
                <Form.Control type="file" name="imagenReferencial" onChange={handleFileChange} />
              </Form.Group>
              <Button onClick={() => setStep(2)}>Siguiente</Button>
            </>
          )}
          {step === 2 && (
            <>
              <h5>Agregar Módulos</h5>
              <Form.Group>
                <Form.Label>Número de Módulos</Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  onChange={(e) => handleAddModulo(parseInt(e.target.value))}
                />
              </Form.Group>
              {modulos.map((modulo, index) => (
                <div key={index}>
                  <Form.Label>Módulo {index + 1}</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nombre del Módulo"
                    value={modulo.nombreModulo}
                    onChange={(e) => handleModuloChange(index, "nombreModulo", e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Descripción"
                    value={modulo.descripcion}
                    onChange={(e) => handleModuloChange(index, "descripcion", e.target.value)}
                  />
                </div>
              ))}
              <Button onClick={() => setStep(1)}>Anterior</Button>
              <Button onClick={() => setStep(3)} style={{ marginLeft: "10px" }}>
                Siguiente
              </Button>
            </>
          )}
          {step === 3 && (
            <>
              <h5>Agregar Clases</h5>
              {modulos.map((modulo) => (
                <div key={modulo.idModulo}>
                  <h6>{modulo.nombreModulo}</h6>
                  <Button onClick={() => handleAddClase(modulo.idModulo)}>Agregar Clase</Button>
                  {(clases.find((m) => m.idModulo === modulo.idModulo)?.clases || []).map((clase, index) => (
                    <div key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Nombre de la Clase"
                        value={clase.nombreClase}
                        onChange={(e) => handleClaseChange(modulo.idModulo, index, "nombreClase", e.target.value)}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Descripción"
                        value={clase.descripcion}
                        onChange={(e) => handleClaseChange(modulo.idModulo, index, "descripcion", e.target.value)}
                      />
                    </div>
                  ))}
                </div>
              ))}
              <Button onClick={() => setStep(2)}>Anterior</Button>
              <Button onClick={handleSubmit} style={{ marginLeft: "10px" }}>
                Crear Curso
              </Button>
            </>
          )}
        </Modal.Body>
        {loading && <Spinner animation="border" />}
      </Modal>
    </>
  );
};

export default CrearCurso;
