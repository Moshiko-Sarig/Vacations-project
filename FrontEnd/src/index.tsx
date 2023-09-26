import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import reportWebVitals from './reportWebVitals';
import allReducers from './Reducers';
import Layout from './Componnent/LayoutArea/Layout/Layout';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

let store = configureStore({
  reducer: allReducers
})

root.render(
  <Provider store={store}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
  </Provider>
);

reportWebVitals();
