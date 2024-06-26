import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import TodoProvider from './Components/context/TodoContext.jsx';
import './index.css';
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AppProvider i18n={enTranslations}>
      <TodoProvider>
        <App />
      </TodoProvider>
    </AppProvider>
  // </React.StrictMode>,
)
