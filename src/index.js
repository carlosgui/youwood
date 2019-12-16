import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/Home';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { Store } from './store';

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import VideoDetail from "./containers/VideoDetail";

ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <Switch>
        <Route path="/video-details/:videoId" render={props => <VideoDetail {...props }/>} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  </Provider>, document.getElementById('root')
);

serviceWorker.unregister();
