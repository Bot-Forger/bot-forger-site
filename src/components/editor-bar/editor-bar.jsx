import Button from './button.jsx';

import workspaceManager from '../../lib/workspace-manager.js';

import './editor-bar.css';

export default function EditorMenuBar() {
    return (
        <div className='editor-bar'>
            <Button onClick={() => workspaceManager.saveWorkspaceToFile('hi.botf')}>Save</Button>
            <Button onClick={() => workspaceManager.loadWorkspaceFromFile()}>Load</Button>
        </div>
    )
}