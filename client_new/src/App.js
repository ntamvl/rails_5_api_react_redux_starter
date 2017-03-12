import React, { Component, PropTypes } from 'react';
import { connect } from "react-redux";
import logo from './logo.svg';
import './App.scss';
import Header from "./components/header/Header";

import { logout } from "./actions/auth";

class App extends Component {
  handleLogout() {
    const { user } = this.props;
    this.props.dispatch(logout(user));
    this.context.router.replace("/login");
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <Header location={this.props.location}
                user={user}
                handleLogout={() => this.handleLogout()}
                logo={logo} />
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  user: PropTypes.object,
  children: PropTypes.node.isRequired,
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
};

App.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

const mapStateToProps = state => {
  const { auth } = state;
  return {
    user: auth ? auth.user : null
  }
}

export default connect(mapStateToProps)(App);
