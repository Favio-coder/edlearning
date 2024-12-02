import React, { useState } from 'react';

const BudgetCalculatorPage: React.FC = () => {
    // Estados para almacenar los ingresos y los gastos
    const [income, setIncome] = useState({ salary: 0, bonuses: 0, indemnities: 0 });
    const [fixedExpenses, setFixedExpenses] = useState({ mortgage: 0, rent: 0, education: 0, other: 0 });
    const [variableExpenses, setVariableExpenses] = useState({ food: 0, transport: 0, utilities: 0, clothing: 0, medical: 0, other: 0 });
    const [discretionaryExpenses, setDiscretionaryExpenses] = useState({ salon: 0, laundry: 0, celebrations: 0, other: 0 });
    const [step, setStep] = useState<number>(1);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showSummary, setShowSummary] = useState<boolean>(false);

    // Función para calcular el presupuesto disponible
    const calculateBudget = (): number => {
        let incomeTotal = income.salary + income.bonuses + income.indemnities;
        let fixedExpensesTotal = fixedExpenses.education + fixedExpenses.mortgage + fixedExpenses.rent + fixedExpenses.other;
        let variableExpensesTotal = variableExpenses.food + variableExpenses.transport + variableExpenses.utilities + variableExpenses.clothing + variableExpenses.medical + variableExpenses.other;
        let discretionaryExpensesTotal = discretionaryExpenses.celebrations + discretionaryExpenses.laundry + discretionaryExpenses.salon + discretionaryExpenses.other;
        return incomeTotal - (fixedExpensesTotal + variableExpensesTotal + discretionaryExpensesTotal);
    };



    // Validar los campos antes de pasar al siguiente paso
    const validateStep = (step: number): boolean => {
        switch (step) {
            case 1:
                if (income.salary <= 0) {
                    setErrors({ ...errors, income: 'Por favor, ingresa tu sueldo o salario.' });
                    return false;
                }
                if (income.bonuses <= 0) {
                    setErrors({ ...errors, income: 'Por favor, ingresa tus propinas, pagos extras y bonus.' });
                    return false;
                }
                if (income.indemnities <= 0) {
                    setErrors({ ...errors, income: 'Por favor, ingresa tus indemnizaciones.' });
                    return false;
                }
                break;
            case 2:
                if (fixedExpenses.mortgage <= 0) {
                    setErrors({ ...errors, fixedExpenses: 'Por favor, ingresa tus gastos en el prestamo hipotecario.' });
                    return false;
                }
                if (fixedExpenses.rent <= 0) {
                    setErrors({ ...errors, fixedExpenses: 'Por favor, ingresa tus gastos en alquiler.' });
                    return false;
                }
                if (fixedExpenses.education <= 0) {
                    setErrors({ ...errors, fixedExpenses: 'Por favor, ingresa tus gastos educacionales.' });
                    return false;
                }
                if (fixedExpenses.other <= 0) {
                    setErrors({ ...errors, fixedExpenses: 'Por favor, ingresa tus otros gastos.' });
                    return false;
                }
                break;
            case 3:
                if (variableExpenses.food <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus gastos en comida.' });
                    return false;
                }
                if (variableExpenses.transport <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus gastos en transporte.' });
                    return false;
                }
                if (variableExpenses.utilities <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus gastos en servicios básicos.' });
                    return false;
                }
                if (variableExpenses.clothing <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus gastos en ropa.' });
                    return false;
                }
                if (variableExpenses.medical <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus gastos médicos.' });
                    return false;
                }
                if (variableExpenses.other <= 0) {
                    setErrors({ ...errors, variableExpenses: 'Por favor, ingresa tus otros gastos.' });
                    return false;
                }
                break;
            case 4:
                if (discretionaryExpenses.salon <= 0) {
                    setErrors({ ...errors, discretionaryExpenses: 'Por favor, ingresa tus gastos en la peluquería.' });
                    return false;
                }
                if (discretionaryExpenses.laundry <= 0) {
                    setErrors({ ...errors, discretionaryExpenses: 'Por favor, ingresa tus gastos de la lavandería.' });
                    return false;
                }
                if (discretionaryExpenses.celebrations <= 0) {
                    setErrors({ ...errors, discretionaryExpenses: 'Por favor, ingresa tus gastos en celebreaciones.' });
                    return false;
                }
                if (discretionaryExpenses.other <= 0) {
                    setErrors({ ...errors, discretionaryExpenses: 'Por favor, ingresa tus otros gastos.' });
                    return false;
                }
                break;
            default:
                return true;
        }
        setErrors({});
        return true;
    };

    // Función para mostrar el resumen
    const handleShowSummary = () => {
        setShowSummary(true);
        setStep(5); // Paso para mostrar el resumen
    };

    // Función para reiniciar la calculadora
    const resetCalculator = () => {
        //Volver gastos del income a 0
        setIncome(prevState => ({ ...prevState, salary: 0 }));
        setIncome(prevState => ({ ...prevState, bonuses: 0 }));
        setIncome(prevState => ({ ...prevState, indemnities: 0 }));

        //Volver gastos del fixedExpense a 0
        setFixedExpenses(prevState => ({ ...prevState, mortgage: 0 }));
        setFixedExpenses(prevState => ({ ...prevState, rent: 0 }));
        setFixedExpenses(prevState => ({ ...prevState, education: 0 }));
        setFixedExpenses(prevState => ({ ...prevState, other: 0 }));

        //Volver gasto del varibaleExpenses a 0 
        setVariableExpenses(prevState => ({ ...prevState, food: 0 }));
        setVariableExpenses(prevState => ({ ...prevState, transport: 0 }));
        setVariableExpenses(prevState => ({ ...prevState, utilities: 0 }));
        setVariableExpenses(prevState => ({ ...prevState, clothing: 0 }));
        setVariableExpenses(prevState => ({ ...prevState, medical: 0 }));
        setVariableExpenses(prevState => ({ ...prevState, other: 0 }));

        //Volver gastos de la variable discretionaryExpenses a 0 
        setDiscretionaryExpenses(prevState => ({ ...prevState, salon: 0 }));
        setDiscretionaryExpenses(prevState => ({ ...prevState, laundry: 0 }));
        setDiscretionaryExpenses(prevState => ({ ...prevState, celebrations: 0 }));
        setDiscretionaryExpenses(prevState => ({ ...prevState, other: 0 }));

        setShowSummary(false);
        setStep(1); // Regresar al paso 1
    };

    const getButtonColor = (stepNumber: number): string => {
        switch (stepNumber) {
            case 1:
                return '#B3F1B0';
            case 2:
                return '#FFCFCF';
            case 3:
                return '#CFDFFF';
            case 4:
                return '#FFFFAF';
            default:
                return '#F4F4F4';
        }
    }

    return (
        <div style={{ height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div className="container mt-5" style={{ backgroundColor: "white", width: "80%", maxWidth: "900px", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <header style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 1000 }}>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <div className="container-fluid">
                            <a className="navbar-brand" href="/authenticated" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                                <p className="mb-0" style={{ color: "#00A2B6", fontWeight: "bold" }}>Smart</p>
                                <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>Finanzas</p>
                            </a>
                        </div>
                    </nav>
                </header>

                <div className="container mt-3"
                    style={{
                        backgroundColor: "white",

                        maxWidth: "900px",
                        padding: "0px",
                        borderRadius: "8px",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        maxHeight: "80vh", // Ajusta la altura máxima
                        overflowY: "auto"   // Habilita el desplazamiento vertical
                    }}>
                    {/* Barra de navegación de pasos */}
                    <h4>Calculadora de presupuesto:</h4>
                    <ul className="nav nav-pills mt-4" id="stepTabs" role="tablist">
                        <li className="nav-item" role="presentation" >
                            <a className={`nav-link ${step === 1 ? 'active' : ''}`} onClick={() => setStep(1)}
                                style={{ backgroundColor: `${step === 1 ? getButtonColor(step) : getButtonColor(6)}`, color: 'black', borderRadius: '0' }}>Ingresos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={`nav-link ${step === 2 ? 'active' : ''}`} onClick={() => setStep(2)}
                                style={{ backgroundColor: `${step == 2 ? getButtonColor(step) : getButtonColor(6)}`, color: 'black', borderRadius: "0" }}>Gastos fijos</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={`nav-link ${step === 3 ? 'active' : ''}`} onClick={() => setStep(3)}
                                style={{ backgroundColor: `${step == 3 ? getButtonColor(step) : getButtonColor(6)}`, color: 'black', borderRadius: "0" }}>Gastos variables</a>
                        </li>
                        <li className="nav-item" role="presentation">
                            <a className={`nav-link ${step === 4 ? 'active' : ''}`} onClick={() => setStep(4)}
                                style={{ backgroundColor: `${step == 4 ? getButtonColor(step) : getButtonColor(6)}`, color: 'black', borderRadius: "0" }}>Gastos discrecionales</a>
                        </li>
                    </ul>
                    {/* Contenedor de pasos */}
                    <div className="tab-content mt-4">
                        {/* Paso 1: Ingresos */}
                        {step === 1 && (
                            <div className="tab-pane fade show active">
                                <form>
                                    {errors.income && <div className="text-danger">{errors.income}</div>}
                                    <div className="mb-3" style={{ backgroundColor: "#F0FDED" }} >
                                        <label htmlFor="salary" className="form-label"><i className="fa-solid fa-dollar-sign"></i> Sueldo o salario</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#F0FDED" }}
                                            className="form-control"
                                            id="salary"
                                            value={income.salary}
                                            onChange={(e) => setIncome(prev => ({ ...prev, salary: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#F0FDED" }}>
                                        <label htmlFor="bonuses" className="form-label"><i className="fa-solid fa-coins"></i> Propinas, pagos extras y bonus</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#F0FDED" }}
                                            className="form-control"
                                            id="bonuses"
                                            value={income.bonuses}
                                            onChange={(e) => setIncome(prev => ({ ...prev, bonuses: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#F0FDED" }}>
                                        <label htmlFor="indemnities" className="form-label"><i className="fa-solid fa-piggy-bank"></i>  Indemnizaciones
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            id="indemnities"
                                            style={{ backgroundColor: "#F0FDED" }}
                                            value={income.indemnities}
                                            onChange={(e) => setIncome(prev => ({ ...prev, indemnities: e.target.valueAsNumber }))}
                                        />

                                    </div>

                                    <button type="button" className="btn btn-primary" onClick={() => validateStep(1) && setStep(2)}>Siguiente</button>
                                </form>
                            </div>
                        )}

                        {/* Paso 2: Gastos fijos */}
                        {step === 2 && (
                            <div className="tab-pane fade show active">
                                <form>
                                    {errors.fixedExpenses && <div className="text-danger">{errors.fixedExpenses}</div>}
                                    <div className="mb-3" style={{ backgroundColor: "#FDEDEE" }}>
                                        <label htmlFor="mortgage" className="form-label"><i className="fa-solid fa-house"></i>  Préstamo Hipotecario (viviendo habitual)</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDEDEE" }}
                                            className="form-control"
                                            id="mortgage"
                                            value={fixedExpenses.mortgage}
                                            onChange={(e) => setFixedExpenses(prev => ({ ...prev, mortgage: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDEDEE" }}>
                                        <label htmlFor="rent" className="form-label"><i className="fa-solid fa-suitcase"></i>  Alquiler (viviendo actual)</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDEDEE" }}
                                            className="form-control"
                                            id="rent"
                                            value={fixedExpenses.rent}
                                            onChange={(e) => setFixedExpenses(prev => ({ ...prev, rent: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDEDEE" }}>
                                        <label htmlFor="education" className="form-label"><i className="fa-solid fa-school"></i>  Pensiones(Educacionales y otros)</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDEDEE" }}
                                            className="form-control"
                                            id="education"
                                            value={fixedExpenses.education}
                                            onChange={(e) => setFixedExpenses(prev => ({ ...prev, education: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDEDEE" }}>
                                        <label htmlFor="other" className="form-label"><i className="fa-solid fa-ellipsis"></i>  Otros gastos</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDEDEE" }}
                                            className="form-control"
                                            id="other"
                                            value={fixedExpenses.other}
                                            onChange={(e) => setFixedExpenses(prev => ({ ...prev, other: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(1)}>Anterior</button>
                                    <button type="button" className="btn btn-primary" onClick={() => validateStep(2) && setStep(3)}>Siguiente</button>
                                </form>
                            </div>
                        )}

                        {/* Paso 3: Gastos variables */}
                        {step === 3 && (
                            <div className="tab-pane fade show active">
                                <form>
                                    {errors.variableExpenses && <div className="text-danger">{errors.variableExpenses}</div>}
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="food" className="form-label"><i className="fa-solid fa-carrot"></i> Comida</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="food"
                                            value={variableExpenses.food}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, food: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="transport" className="form-label"><i className="fa-solid fa-bus"></i> Transporte</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="transport"
                                            value={variableExpenses.transport}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, transport: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="utilities" className="form-label"><i className="fa-solid fa-bolt"></i> Electricidad, agua y gas</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="utilities"
                                            value={variableExpenses.utilities}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, utilities: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="clothing" className="form-label"><i className="fa-solid fa-person-dress"></i> Accesorio(Ropa, productos de belleza y otros)</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="clothing"
                                            value={variableExpenses.clothing}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, clothing: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="medical" className="form-label"><i className="fa-solid fa-hospital"></i> Gastos médicos(Seguro, medicamentos y hospital)</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="medical"
                                            value={variableExpenses.medical}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, medical: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#EAF7FF" }}>
                                        <label htmlFor="other" className="form-label"><i className="fa-solid fa-ellipsis"></i>  Otros gastos</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#EAF7FF" }}
                                            className="form-control"
                                            id="other"
                                            value={variableExpenses.other}
                                            onChange={(e) => setVariableExpenses(prev => ({ ...prev, other: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(2)}>Anterior</button>
                                    <button type="button" className="btn btn-primary" onClick={() => validateStep(3) && setStep(4)}>Siguiente</button>
                                </form>
                            </div>
                        )}

                        {/* Paso 4: Gastos discrecionales */}
                        {step === 4 && (
                            <div className="tab-pane fade show active">
                                <form>
                                    {errors.discretionaryExpenses && <div className="text-danger">{errors.discretionaryExpenses}</div>}
                                    <div className="mb-3" style={{ backgroundColor: "#FDFDED" }}>
                                        <label htmlFor="salon" className="form-label"><i className="fa-solid fa-scissors"></i> Peluquerías o salón de belleza</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDFDED" }}
                                            className="form-control"
                                            id="salon"
                                            value={discretionaryExpenses.salon}
                                            onChange={(e) => setDiscretionaryExpenses(prev => ({ ...prev, salon: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDFDED" }}>
                                        <label htmlFor="laundry" className="form-label"><i className="fa-solid fa-user-tie"></i> Lavendería o tintorería</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDFDED" }}
                                            className="form-control"
                                            id="laundry"
                                            value={discretionaryExpenses.laundry}
                                            onChange={(e) => setDiscretionaryExpenses(prev => ({ ...prev, laundry: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDFDED" }}>
                                        <label htmlFor="celebrations" className="form-label"><i className="fa-solid fa-gift"></i> Cumpleaños o celebraciones</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDFDED" }}
                                            className="form-control"
                                            id="celebrations"
                                            value={discretionaryExpenses.celebrations}
                                            onChange={(e) => setDiscretionaryExpenses(prev => ({ ...prev, celebrations: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <div className="mb-3" style={{ backgroundColor: "#FDFDED" }}>
                                        <label htmlFor="other" className="form-label"><i className="fa-solid fa-ellipsis"></i>  Otros gastos</label>
                                        <input
                                            type="number"
                                            style={{ backgroundColor: "#FDFDED" }}
                                            className="form-control"
                                            id="other"
                                            value={discretionaryExpenses.other}
                                            onChange={(e) => setDiscretionaryExpenses(prev => ({ ...prev, other: e.target.valueAsNumber }))}
                                        />

                                    </div>
                                    <button type="button" className="btn btn-secondary" onClick={() => setStep(3)}>Anterior</button>
                                    <button type="button" className="btn btn-primary" onClick={() => handleShowSummary()}>Ver resumen</button>
                                </form>
                            </div>
                        )}

                        {/* Resumen */}
                        {showSummary && (
                            <div className="card mt-4">
                                <div className="card-header">
                                    <h4>Resumen del presupuesto</h4>
                                </div>
                                <div className="card-body">
                                    <p style={{ color: "#80D331" }}><strong>Ingresos netos:</strong> S/. {(income.bonuses + income.indemnities + income.salary)}</p>
                                    <p style={{ color: "#FF0000" }}><strong>Gastos fijos:</strong> S/. {fixedExpenses.education + fixedExpenses.mortgage + fixedExpenses.rent + fixedExpenses.other}</p>
                                    <p style={{ color: "#6A3ED7" }}><strong>Gastos variables:</strong> S/. {variableExpenses.clothing + variableExpenses.food + variableExpenses.medical + variableExpenses.transport + variableExpenses.utilities + variableExpenses.other}</p>
                                    <p style={{ color: "#FF823D" }}><strong>Gastos discrecionales:</strong> S/. {discretionaryExpenses.celebrations + discretionaryExpenses.laundry + discretionaryExpenses.salon + discretionaryExpenses.other}</p>
                                    <p><strong>Presupuesto disponible:</strong> S/. {calculateBudget()}</p>
                                    <p
                                        style={{ color: `${calculateBudget() < 0 ? 'red' : '#009975'}` }}

                                    >
                                        <strong>Advertencia:</strong>
                                        {calculateBudget() < 0 ?
                                            " ¡Gastas más de lo que tienes!, debes reducir tus gastos." :
                                            " Tienes un presupuesto positivo, ¡continúa manteniendo tus finanzas bajo control!"
                                        }
                                    </p>
                                    
                                    <button className="btn btn-primary" onClick={resetCalculator}>Volver a intentar</button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>



            </div>
        </div>
    );
};

export default BudgetCalculatorPage;
