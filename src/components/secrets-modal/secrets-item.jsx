import TrashIcon from '../../icons/trash.svg?react';

function SecretsItem (props) {
    return (
        
        <div className='secrets-item'>
            <TrashIcon
                className="trash-icon"
                width="1.5rem"
                height="1.5rem"
                onClick={props.onDelete}
            />
            <p>{props.name}</p>
            <input
                type='text'
                value={props.value}
                onChange={props.onChange}
                placeholder="Enter a value..."
            />
        </div>
    );
}

export default SecretsItem;