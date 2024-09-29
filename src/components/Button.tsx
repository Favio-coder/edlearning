import './Button.css'; // Importa el archivo CSS

interface Props {
    body: string;
    color: string; // Color del texto dinámico
    backgroundColor: string; // Color de fondo dinámico
}

function Button(props: Props) {
    const { body, color, backgroundColor } = props;

    return (
        <button
            type="button"
            className="btn-custom"
            style={{
                color: color, // Color del texto dinámico
                backgroundColor: backgroundColor, // Color de fondo dinámico
            }}
        >
            {body}
        </button>
    );
}

export default Button;
