import { EventEmitter } from 'events';
import notify from '../notify';

import AccountStore from './account';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class BotStore extends EventEmitter {
    constructor () {
        super();

        this.bot = {};
        this.botLoaded = false;
    }
    async loadFromID (id) {
        if (!id || !AccountStore.hasSession) return null;
        const response = await fetch(`${BACKEND_URL}/applications/${id}`, {
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        this.bot = await response.json();
        this.botLoaded = true;
        
        this.bot.commands = JSON.parse(this.bot.commands);
        this.bot.blocks = JSON.parse(this.bot.blocks);

        return null;
    }
    getCommands () {
        return this.bot.commands ?? [];
    }
    updateCommands (commands) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ commands }),
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update commands: ${response.statusText} ${response.status}`);
            }
        });
    }
    getBotSettings () {
        return this.bot ?? {};
    }
    updateBotSettings (updatedSettings) {
        if (Object.keys(updatedSettings).length < 1) return;
        fetch(`${BACKEND_URL}/applications/${this.bot.id}`, {
            method: 'PATCH',
            body: JSON.stringify(updatedSettings),
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot settings: ${response.statusText} ${response.status}`);
                return;
            }
            for (const [key, value] of Object.entries(updatedSettings)) {
                this.bot[key] = value;
            }
        });
    }
    async fetchSecrets () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            throw new Error(`${response.status} ${response.statusText}`);
        }
        return await response.json();
    }
    postSecrets (secrets) {
        fetch(`${BACKEND_URL}/applications/${this.bot.id}/secrets`, {
            method: 'POST',
            body: JSON.stringify(secrets),
            headers: {
                'Content-Type': 'application/json',
                'x-session-token': AccountStore.session.token
            }
        }).then(response => {
            if (!response.ok) {
                notify('error', `Failed to update bot secrets: ${response.status} ${response.statusText}`);
            }
        });
    }
    async startBot () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/start`, {
            method: 'POST',
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            notify('error', `Failed to start bot: ${response.status} ${response.statusText}`);
            return;
        }
    }
    async stopBot () {
        const response = await fetch(`${BACKEND_URL}/applications/${this.bot.id}/stop`, {
            method: 'POST',
            headers: { 'x-session-token': AccountStore.session.token }
        });
        if (!response.ok) {
            notify('error', `Failed to stop bot: ${response.status} ${response.statusText}`);
            return;
        }
    }
}

export default new BotStore;