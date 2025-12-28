import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router';
import Modal from 'react-modal';

import ThemeStore from './lib/stores/theme.js';

import './index.css';

import Editor from './pages/editor.jsx'

Modal.setAppElement('#root');

const root = document.getElementById('root');

ThemeStore.on('themeChange', theme => {
  document.body.className = 'theme-' + theme
});

document.body.classList.add('theme-' + ThemeStore.getTheme());

createRoot(root).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Editor />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
