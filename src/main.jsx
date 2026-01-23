import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import Modal from 'react-modal';

import ThemeStore from './lib/stores/theme.js';

import './styles/main.css';
import './styles/icons.css';

import Dashboard from './pages/dashboard.jsx';
import Editor from './pages/editor.jsx'

Modal.setAppElement('#root');

const root = document.getElementById('root');

ThemeStore.on('themeChange', theme => {
  document.body.className = 'theme-' + theme
});

document.body.classList.add('theme-' + ThemeStore.getTheme());

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
            refetchIntervalInBackground: false,
        }
    }
});

createRoot(root).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/editor/:id?' element={<Editor />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
);