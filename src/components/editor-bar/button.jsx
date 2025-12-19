export default function Button(props) {
    return (
        <div className='editor-button' onClick={props.onClick}>
            {props.children}
        </div>
    )
}