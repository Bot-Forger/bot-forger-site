import { toast } from 'react-toastify';
import ThemeStore from './stores/theme';

// A wrapper over react-toastify to handle themes and various other options

function notify (type, message, options) {
    if (type === 'default') {
        toast(message, {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: false,
            closeOnClick: true,
            theme: ThemeStore.getTheme(),
            ...options
        });
    } else {
        toast[type](message, {
            position: 'top-right',
            autoClose: 3000,
            pauseOnHover: false,
            closeOnClick: true,
            theme: ThemeStore.getTheme(),
            ...options
        });
    }
}

export default notify;