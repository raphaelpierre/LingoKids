import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './config/firebase'; // Import firebase config but don't initialize here
import { useAuthStore } from './stores/authStore';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

// Initialize auth state before rendering
useAuthStore.getState().initialize();

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);