import { Link } from "react-router-dom"

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
            className="btn btn-primary btn-lg"
            style={{
                margin: '10px 2px', 
                background: backgroundColor,
                borderColor: backgroundColor,
                borderWidth: '1px',
                color: color
            }}
        >
            {body}
        </button>
        </Link>
        
    )
}

export default Button;