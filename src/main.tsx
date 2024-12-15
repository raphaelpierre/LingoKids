import React, { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import './config/firebase'; // Import firebase config but don't initialize here
import { useAuthStore } from './stores/authStore';

const RootComponent: React.FC = () => {
  useEffect(() => {
    console.log('🚀 Initializing Auth Store');
    useAuthStore.getState().initialize();
  }, []);

  return <App />;
};

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <StrictMode>
    <RootComponent />
  </StrictMode>
);