import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContextProvider } from './context/AuthContext';
import { TaskContextProvider } from './context/TaskContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      < TaskContextProvider >
        <App />
      </TaskContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
reportWebVitals();
