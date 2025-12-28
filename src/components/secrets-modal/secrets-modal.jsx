import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';

import Modal from '../modal/modal';
import Loader from '../loader/loader.jsx';
import Error from '../error/error.jsx';

import SecretsItem from './secrets-item';

import BotStore from '../../lib/stores/bot.js';

import './secrets-modal.css';

function SecretsModal (props) {
    const { isPending, error, data } = useQuery({
        queryKey: ['secretsData'],
        queryFn: () => BotStore.fetchSecrets(),
        enabled: props.isOpen
    });

    const [items, setItems] = useState({});

    useEffect(() => {
        if (data) setItems(data);
    }, [data]);

    const handleSecretChange = (name, newValue) => {
        setItems(prev => ({
            ...prev,
            [name]: newValue
        }));
    };

    const handleSecretAdd = () => {
        const name = prompt('Enter a new secret name')?.trim()?.slice(0, 20);
        if (!name || items[name]) return;
        setItems(prev => ({...prev, [name]: ''}));
    };

    const handleSecretDelete = name => {
        if (!confirm(`Are you sure you want to delete secret "${name}"?`)) return;
        setItems(prev => {
            const updated = {...prev};
            delete updated[name];
            return updated;
        });
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onClose={() => {
                setItems(data);
                props.onClose();
            }}
            onSaveClose={() => {
                BotStore.postSecrets(items);
                props.onClose();
            }}
            name='Secrets'
            description="Secrets are private variables which are automatically set when the bot starts."
        >
            {
                isPending ? <Loader /> :
                (error ? <Error message={`Failed to load secrets: ${error.message}`} /> : <>
                    {Object.entries(items || {})
                        .map(([name, value]) => (
                            <SecretsItem
                                name={name}
                                value={value}
                                onChange={val => handleSecretChange(name, val.target.value)}
                                onDelete={() => handleSecretDelete(name)}
                            />
                        ))}
                    <button className='secret-add' onClick={handleSecretAdd}>
                    <svg width="20px" height="20px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill="none">
                        <path fill="black" fillRule="evenodd" d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"/>
                    </svg>
                    <span style={{ fontSize: 15 }}>Add secret</span>
                    </button>
                </>)
            }
        </Modal>
    )
}

export default SecretsModal;