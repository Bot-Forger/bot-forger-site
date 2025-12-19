import { EventEmitter } from 'events';

class ThemeStore extends EventEmitter {
    constructor() {
        super();
        
        this.theme = localStorage.getItem('theme') ?? this.getUserThemePreference();
    }
    getUserThemePreference() {
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    getTheme() {
        return this.theme;
    }
    setTheme(theme) {
        this.theme = theme;
        localStorage.setItem('theme', theme);

        this.emit('themeChange', theme);
    }

}

export default new ThemeStore;