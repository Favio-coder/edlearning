
interface Props {
    body: string
    color: string
    backgroundColor: string
}

function Button(props: Props) {

    const { body, color, backgroundColor } = props

    return (
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
    )
}

export default Button;