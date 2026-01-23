import TrashIcon from '../../icons/trash.svg?react';

function relativeDate(date) {
    const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

    const now = new Date();
    const diffMs = date - now;
    const diffSec = Math.round(diffMs / 1000);

    const divisions = [
        { amount: 60, unit: 'second' },
        { amount: 60, unit: 'minute' },
        { amount: 24, unit: 'hour' },
        { amount: 7, unit: 'day' },
        { amount: 4.34524, unit: 'week' },
        { amount: 12, unit: 'month' },
        { amount: Infinity, unit: 'year' }
    ];

    let duration = diffSec;
    for (const { amount, unit } of divisions) {
        if (Math.abs(duration) < amount) {
            return rtf.format(Math.round(duration), unit);
        }
        duration /= amount;
    }
}


function BotItem (props) {
    return (
        <div className='bot-item'>
            <TrashIcon
                className="trash-icon"
                width="1.5rem"
                height="1.5rem"
                onClick={() => {
                    if (confirm(`Are you sure you want to delete "${props.name}"? This action can't be undone!`)) {
                        props.onDelete(props.id);
                    }
                }}
            />
            <h1>{props.name}</h1>
            <p>Last edited {relativeDate(props.lastUpdated)}</p>

            <button onClick={() => location.href = '/editor/' + props.id}>Edit</button>
        </div>
    );
}

export default BotItem;