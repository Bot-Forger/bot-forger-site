import { EventEmitter } from 'events';

import serialize from './serialize';
import deserializeToWorkspace from './deserialize';

class WorkspaceManager extends EventEmitter {
    constructor() {
        super();

        this.workspace = null;
    }
    attachWorkspace(workspace) {
        this.workspace = workspace;
    }
    detatchWorkspace() {
        this.workspace = null;
    }
    openFile(accept) {
        return new Promise((resolve, reject) => {
            const i = document.createElement('input');
            i.type = 'file';
            i.accept = accept;

            i.onchange = e => {
                if (e.target.files.length > 0) {
                    resolve(e.target.files[0]);
                } else {
                    resolve('');
                }
            }

            i.click();
            i.remove();
        });
    }
    saveFile(fileName, blobURI) {
        const a = document.createElement('a');
        a.href = blobURI;
        a.download = fileName;
        a.click();
        a.remove();
    }
    async loadWorkspaceFromFile() {
        const openedFile = await this.openFile('*.botf');

        try {
           const json = JSON.parse(await openedFile.text());
           deserializeToWorkspace(json, this.workspace);
        } catch (e) {
            console.warn('Failed to load workspace from file', e);
        }
    }
    async saveWorkspaceToFile(fileName) {
        const serialized = JSON.stringify(serialize(this.workspace));
        this.saveFile(fileName, URL.createObjectURL(new Blob([serialized])));
    }
};

export default new WorkspaceManager;