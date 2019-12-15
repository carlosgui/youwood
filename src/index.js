import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './pages/Home/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Store } from './store';

ReactDOM.render(
  <Provider store={Store}>
    <Home />
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
