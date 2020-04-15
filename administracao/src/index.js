import React from 'react';
import ReactDOM from 'react-dom';
//import 'react-toastify/dist/ReactToastify.min.css'
import './index.css';
import App from './App';
import './utils/Functions';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
