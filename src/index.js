import React from 'react';
import ReactDOM from 'react-dom/client'
import { RootCmp } from './root-cmp';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import './assets/styles/main.scss'
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
// import { store } from './store/store';
import configureStore from './configure-store';


const root = ReactDOM.createRoot(document.getElementById('root'));
// console.log('store from index ' , store)
const store = configureStore()

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <RootCmp />
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
