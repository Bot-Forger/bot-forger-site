import { EventEmitter } from 'events';
import JSZip from 'jszip';
import * as Blockly from 'blockly/core';

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
        const jszip = new JSZip();

        try {
            const zip = await jszip.loadAsync(await openedFile.arrayBuffer());

            const workspaceFile = zip.file("workspace.xml");
            if (workspaceFile) {
                this.workspace.clear();
                const xmlDom = Blockly.utils.xml.textToDom(await workspaceFile.async('text'));
                Blockly.Xml.domToWorkspace(xmlDom, this.workspace);
            } else {
                throw new Error('workspace.xml not found in file');
            }
        } catch (e) {
            console.warn('Failed to load workspace from file: ' + e);
        }
    }
    async saveWorkspaceToFile(fileName) {
        const xmlDom = Blockly.Xml.workspaceToDom(this.workspace);
        const xmlString = Blockly.Xml.domToText(xmlDom);

        const zip = new JSZip();
        zip.file('workspace.xml', xmlString);

        const generatedZip = await zip.generateAsync({ type: 'blob' });

        this.saveFile(fileName, URL.createObjectURL(generatedZip));
    }
};

export default new WorkspaceManager;