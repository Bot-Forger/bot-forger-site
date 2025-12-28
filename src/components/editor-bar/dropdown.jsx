import { useState, useEffect, useRef } from 'react';
import Button from './button';
import DropdownCaret from './dropdown-caret.svg';

function DropdownMenu(props) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClick = e => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setIsOpen(false)
            }
        };

        document.addEventListener('pointerup', handleClick, true);
        return () => document.removeEventListener('pointerup', handleClick, true);
    }, []);

    return (
        <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
            <Button onClick={() => setIsOpen(!isOpen)}>
                {props.label}
                <img
                    src={DropdownCaret}
                    style={{ paddingLeft: '6px', verticalAlign: 'middle' }}
                    width={10}
                    height={10}
                />
            </Button>
            {isOpen && (
                <div className='editor-bar-dropdown'>
                    {props.children}
                </div>
            )}
        </div>
    )
}

export default DropdownMenu;