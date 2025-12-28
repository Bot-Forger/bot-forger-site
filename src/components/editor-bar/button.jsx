export default function Button(props) {
    return (
        <div className='editor-button' onClick={props.onClick} disabled={props.disabled}>
            {props.children}
        </div>
    )
}