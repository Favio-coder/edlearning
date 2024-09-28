// Button.tsx
import React from "react";
import "./Button.css"; // Asegúrate de importar el archivo CSS

interface Props {
    body: string;
}

const Button: React.FC<Props> = ({ body }) => {
    return (
        <button type="button" className="btn-custom">
            {body}
        </button>
    );
};

export default Button;
