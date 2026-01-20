import './console.css';

function Console (props) {
    return (
        <div className='bot-console' style={props.style}>
            <pre>
                {props.logs?.length > 0 ? 
                    props.logs.map((log, i) => 
                        <p id={'log-' + (log.type || 'other')} key={i}>{log.type ? `[${log.type.toUpperCase()}]`: ''} {log.message}</p>
                    ) :
                    <i>No logs yet...</i>
                }
            </pre>
        </div>
    );
}

export default Console;