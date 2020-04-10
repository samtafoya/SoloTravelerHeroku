import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Test from './blog';
import Login from './login'
import Suggest from './suggest'
import * as serviceWorker from './serviceWorker';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div class="nav">
      <Link class="wrap" to="/">Home</Link>
      <Link class="wrap" to="/blog">Blog</Link>
      <Link class="wrap" to="/suggest">Suggestions</Link>
      <Link class="wrap" to="/login">Login</Link>
    </div>
    <div>
      <Route exact path="/" component={App} />
      <Route path="/blog" component={Test} />
      <Route path="/suggest" component={Suggest} />
      <Route path="/login" component={Login} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
