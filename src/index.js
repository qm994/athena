import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import axios from 'axios';
import App from './App';
import { store } from './redux/store';

axios.defaults.baseURL = 'http://localhost:5000';
axios.defaults.headers.post['Content-Type'] = 'application/json';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);
