const Button = (props) => {
    return (
        <div
            role="button"
            onClick={() => props.action()}
            onKeyUp={() => props.action()}
            tabIndex="0"
            id={props.id}
        >
            {props.label}
        </div>
    )
}