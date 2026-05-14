import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './routes/router';
import ThemeProvider from './context/ThemeContext'; 

import './main.scss';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>           
      <AppRouter />
    </ThemeProvider>
  </StrictMode>
);