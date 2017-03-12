import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Tether = require("tether");
require("bootstrap/dist/js/bootstrap");

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router, Route, IndexRoute } from "react-router";

import { browserHistory } from "react-router";
// import { useRouterHistory, browserHistory } from "react-router";
// import { createHashHistory } from "history";
// const history = useRouterHistory(createHashHistory)();
//////////////////////////////////////////////////////////////////////////

import configureStore from "./store/configureStore";

import './index.scss';
import './styles/styles.scss';

import App from './App';
import Home from "./containers/home/Home";
import About from "./containers/about/About";
import Feature from "./containers/feature/Feature";
import Login from "./containers/login/Login";
import RestrictPage from "./containers/misc/RestrictPage";
import ProductPage from "./containers/product/ProductPage";
import UsersPage from './containers/user/UsersPage';
import SignupPage from './containers/user/SignupPage';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route component={RestrictPage}>
          <Route path="/features" component={Feature} />
          <Route path="/products" component={ProductPage} />
          <Route path="/users" component={UsersPage} />
        </Route>
        <Route path="/signup" component={SignupPage} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
