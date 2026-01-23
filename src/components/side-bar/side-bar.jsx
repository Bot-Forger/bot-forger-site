import FolderIcon from '../../icons/folder.svg?react';
import GearIcon from '../../icons/gear.svg?react';

import './side-bar.css';

function SideBar (props) {
    return (
        <div className='side-bar'>
            <button onClick={() => props.onPageSelect('bots')}>
                <FolderIcon
                    className='folder-icon'
                    width='1.25rem'
                    height='1.25rem'
                    style={{ marginRight: '0.5rem' }}
                />
                My Bots
            </button>
            <button onClick={() => props.onPageSelect('preferences')}>
                <GearIcon
                    className='gear-icon'
                    width='1.25rem'
                    height='1.25rem'
                    style={{ marginRight: '0.5rem' }}
                />
                Preferences
            </button>
        </div>
    );
}

export default SideBar;