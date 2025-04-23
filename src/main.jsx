import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routes/AppRouter';
import { Provider } from 'react-redux';
import store from './app/store';
// import './styles/main.scss'; // si tu utilises SCSS

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AppRouter />
  </Provider>
);
