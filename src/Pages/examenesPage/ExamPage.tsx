import React, { useState, useEffect } from "react";
import { Button, Card, Form, Alert, Pagination } from "react-bootstrap";

const ExamPage: React.FC = () => {
  // Diccionario de preguntas con respuestas
  const questions = [
    {
      id: 1,
      question: "¿Qué es el PIB?",
      options: [
        "Producto Interno Bruto",
        "Producto Internacional Bruto",
        "Producto Individual Bruto",
        "Producto Interno Básico",
      ],
      correctAnswer: "Producto Interno Bruto",
    },
    {
      id: 2,
      question: "¿Qué es la inflación?",
      options: [
        "Aumento generalizado de precios",
        "Disminución de los precios",
        "Estabilidad de precios",
        "Desempleo",
      ],
      correctAnswer: "Aumento generalizado de precios",
    },
    {
      id: 3,
      question: "¿Qué es la deuda pública?",
      options: [
        "El dinero que el gobierno debe",
        "El dinero que los ciudadanos deben al gobierno",
        "La cantidad de dinero en circulación",
        "El dinero que el gobierno recibe de los impuestos",
      ],
      correctAnswer: "El dinero que el gobierno debe",
    },
    {
      id: 4,
      question: "¿Qué es la oferta y la demanda?",
      options: [
        "La relación entre los productores y los consumidores",
        "La cantidad de dinero en el mercado",
        "El balance de la economía",
        "La cantidad de impuestos que el gobierno impone",
      ],
      correctAnswer: "La relación entre los productores y los consumidores",
    },
    {
      id: 5,
      question: "¿Qué es la tasa de interés?",
      options: [
        "El porcentaje que los bancos cobran por los préstamos",
        "El valor de la moneda extranjera",
        "El precio de los productos en el mercado",
        "La cantidad de dinero en circulación",
      ],
      correctAnswer: "El porcentaje que los bancos cobran por los préstamos",
    },
    {
      id: 6,
      question: "¿Qué es un monopolio?",
      options: [
        "Un mercado donde solo hay un productor",
        "Un mercado con múltiples competidores",
        "Un acuerdo entre empresas para controlar el precio",
        "Un mercado donde no existen empresas",
      ],
      correctAnswer: "Un mercado donde solo hay un productor",
    },
    {
      id: 7,
      question: "¿Qué es el déficit fiscal?",
      options: [
        "Cuando el gasto del gobierno supera los ingresos",
        "Cuando el gobierno ahorra más de lo que gasta",
        "Cuando los ingresos del gobierno aumentan",
        "Cuando el gobierno reduce la deuda externa",
      ],
      correctAnswer: "Cuando el gasto del gobierno supera los ingresos",
    },
    {
      id: 8,
      question: "¿Qué es la balanza comercial?",
      options: [
        "La diferencia entre las exportaciones e importaciones",
        "El monto de dinero prestado por otros países",
        "El saldo de la deuda externa de un país",
        "El balance entre el ahorro y el consumo",
      ],
      correctAnswer: "La diferencia entre las exportaciones e importaciones",
    },
    {
      id: 9,
      question: "¿Qué es el desempleo estructural?",
      options: [
        "Desempleo debido a la falta de habilidades adecuadas para el mercado laboral",
        "Desempleo por razones estacionales",
        "Desempleo generado por una crisis económica",
        "Desempleo debido a la baja demanda de mano de obra",
      ],
      correctAnswer: "Desempleo debido a la falta de habilidades adecuadas para el mercado laboral",
    },
    {
      id: 10,
      question: "¿Qué es el PIB per cápita?",
      options: [
        "El Producto Interno Bruto dividido entre la población",
        "El total de la producción nacional",
        "La cantidad de dinero que circula en la economía",
        "El nivel de inversión extranjera directa",
      ],
      correctAnswer: "El Producto Interno Bruto dividido entre la población",
    },
    {
      id: 11,
      question: "¿Qué es el crecimiento económico?",
      options: [
        "El aumento sostenido de la producción de bienes y servicios",
        "El aumento de la deuda pública",
        "El aumento de la inversión extranjera directa",
        "El aumento de la tasa de inflación",
      ],
      correctAnswer: "El aumento sostenido de la producción de bienes y servicios",
    },
    {
      id: 12,
      question: "¿Qué es la política fiscal?",
      options: [
        "El uso del gasto público y la recaudación de impuestos para influir en la economía",
        "El control de la tasa de interés en el mercado",
        "La regulación del tipo de cambio de la moneda",
        "La intervención del gobierno en la distribución de los ingresos",
      ],
      correctAnswer: "El uso del gasto público y la recaudación de impuestos para influir en la economía",
    },
    {
      id: 13,
      question: "¿Qué es la deflación?",
      options: [
        "La disminución generalizada de los precios",
        "El aumento de la tasa de interés",
        "La disminución de la oferta de dinero",
        "El aumento de la tasa de inflación",
      ],
      correctAnswer: "La disminución generalizada de los precios",
    },
    {
      id: 14,
      question: "¿Qué es la inflación subyacente?",
      options: [
        "La inflación que no incluye los precios de alimentos y energía",
        "La inflación causada por el aumento de los impuestos",
        "La inflación en productos de lujo",
        "La inflación que afecta únicamente a los países en desarrollo",
      ],
      correctAnswer: "La inflación que no incluye los precios de alimentos y energía",
    },
    {
      id: 15,
      question: "¿Qué es el índice de precios al consumidor (IPC)?",
      options: [
        "Un indicador que mide la variación en los precios de una canasta de bienes y servicios",
        "Un indicador de la cantidad de dinero en circulación",
        "Un indicador del nivel de inversión extranjera directa",
        "Un indicador de la tasa de interés en el mercado",
      ],
      correctAnswer: "Un indicador que mide la variación en los precios de una canasta de bienes y servicios",
    }
  ];

  // Estado de las respuestas y el puntaje
  const [userAnswers, setUserAnswers] = useState<any>({});
  const [score, setScore] = useState<number>(0);
  const [showResult, setShowResult] = useState<boolean>(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedQuestions, setSelectedQuestions] = useState<any[]>([]);

  useEffect(() => {
    // Seleccionar aleatoriamente 5 preguntas de la lista
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
    setSelectedQuestions(shuffledQuestions);
  }, []);

  // Función para manejar el cambio de respuesta
  const handleAnswerChange = (questionId: number, answer: string) => {
    setUserAnswers((prevAnswers: any) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  // Función para verificar si la respuesta es correcta o incorrecta
  const getAnswerColor = (questionId: number, answer: string) => {
    if (!userAnswers[questionId]) return ""; // No se ha seleccionado respuesta
    if (userAnswers[questionId] === answer) {
      return userAnswers[questionId] === selectedQuestions.find(q => q.id === questionId)?.correctAnswer
        ? "bg-success text-white" : "bg-danger text-white";
    }
    return "";
  };

  // Función para ir a la siguiente pregunta
  const handleNextQuestion = () => {
    if (currentQuestionIndex < selectedQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  // Función para ir a la pregunta anterior
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  // Función para mostrar el resultado
  const calculateScore = () => {
    let score = 0;
    selectedQuestions.forEach((question) => {
      if (userAnswers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });
    setScore(score);
    setShowResult(true);
  };

  return (
    <div className="container mt-5">
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
      <main>
        <Card>
          <Card.Body>
            <h5>{selectedQuestions[currentQuestionIndex]?.question}</h5>
            <Form>
              {selectedQuestions[currentQuestionIndex]?.options.map((option: string) => (
                <Form.Check
                  key={option}
                  type="radio"
                  name={`question-${selectedQuestions[currentQuestionIndex]?.id}`}
                  label={option}
                  value={option}
                  checked={userAnswers[selectedQuestions[currentQuestionIndex]?.id] === option}
                  onChange={() => handleAnswerChange(selectedQuestions[currentQuestionIndex]?.id, option)}
                  className={getAnswerColor(selectedQuestions[currentQuestionIndex]?.id, option)}
                />
              ))}
            </Form>
          </Card.Body>
        </Card>

        <div className="d-flex justify-content-between mt-3">
          <Button
            variant="secondary"
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Anterior
          </Button>
          {currentQuestionIndex === selectedQuestions.length - 1 ? (
            <Button variant="primary" onClick={calculateScore}>
              Ver Resultado
            </Button>
          ) : (
            <Button variant="primary" onClick={handleNextQuestion}>
              Siguiente
            </Button>
          )}
        </div>

        {showResult && (
          <Alert variant="success" className="mt-4">
            <h4>Tu puntaje: {score} / {selectedQuestions.length}</h4>
          </Alert>
        )}

        <Pagination className="mt-3">
          {Array.from({ length: selectedQuestions.length }, (_, index) => (
            <Pagination.Item
              key={index}
              active={currentQuestionIndex === index}
              onClick={() => setCurrentQuestionIndex(index)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </main>
    </div>
  );
};

export default ExamPage;
