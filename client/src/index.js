import 'bootstrap/dist/css/bootstrap.css';
import jquery from "jquery";
window.$ = window.jQuery = jquery;
window.Tether = require("tether");
require("bootstrap/dist/js/bootstrap");

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { Router, Route, IndexRoute } from "react-router";

import { useRouterHistory } from "react-router";
import { createHashHistory } from "history";
const history = useRouterHistory(createHashHistory)();
//////////////////////////////////////////////////////////////////////////

import configureStore from "./store/configureStore";

import App from "./containers/app/App";
import Login from "./containers/login/Login";
import RestrictPage from "./containers/misc/RestrictPage";
import Home from "./containers/home/Home";
import UsersPage from "./containers/user/UsersPage";
import ReposPage from "./containers/repo/ReposPage";
import About from "./containers/about/About";
import NotFound from "./containers/misc/NotFound";
import './index.scss';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/about" component={About} />
        <Route path="/login" component={Login} />
        <Route component={RestrictPage}>
          <Route path="/users" component={UsersPage} />
          <Route path="/repos" component={ReposPage} />
        </Route>

        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
