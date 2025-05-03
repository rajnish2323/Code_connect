import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// 🔥 Import Redux Provider and your store
import { Provider } from 'react-redux';
import AppStore from './utils/AppStore'; // make sure the path is correct

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={AppStore}>
      <App />
    </Provider>
  </StrictMode>
);
