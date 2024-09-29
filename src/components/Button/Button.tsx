import { Link } from "react-router-dom"
import "../Button.css"

interface Props {
    body: string
    color: string
    backgroundColor: string
    to: string
}

function Button(props: Props) {

    const { body, color, backgroundColor, to } = props

    return (
        <Link to={to} style={{textDecoration: 'none'}}>
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
        </Link>
        
    )
}

export default Button;
