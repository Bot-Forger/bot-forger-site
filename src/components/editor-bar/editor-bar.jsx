import Button from './button.jsx';
import DropdownMenu from './dropdown.jsx';

import workspaceManager from '../../lib/workspace-manager.js';
import ThemeStore from '../../lib/stores/theme.js';

import './editor-bar.css';

export default function EditorMenuBar (props) {
    return (
        <div className='editor-bar'>
            <DropdownMenu label="File">
                <Button onClick={() => workspaceManager.loadWorkspaceFromFile()}>Load from file</Button>
                <Button onClick={() => workspaceManager.saveWorkspaceToFile('hi.botf')}>Save as</Button>
            </DropdownMenu>
            <DropdownMenu label="Edit">
                <Button onClick={() => ThemeStore.toggleTheme()}>Change Theme</Button>
                <Button onClick={() => props.onMenuOpen('secrets')}>Secrets</Button>
                <Button onClick={() => props.onMenuOpen('botSettings')}>Bot Settings</Button>
            </DropdownMenu>
        </div>
    )
}