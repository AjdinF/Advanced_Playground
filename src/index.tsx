import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/style.css'; // Import global styles if available

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
} else {
  console.error('Root element not found');
}
