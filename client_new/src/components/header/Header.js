import React, { Component, PropTypes } from "react";
import { Link, IndexLink } from "react-router";
import UserProfile from "./UserProfile";
import "./header.scss";

export default class Header extends Component {
  onLogoutClick = event => {
    event.preventDefault();
    this.props.handleLogout();
  }

  render() {
    const { user } = this.props;
    const pathname = this.props.location.pathname;
    const isLoginPage = pathname.indexOf("login") > -1;
    return !isLoginPage &&
      <nav className="navbar navbar-fixed-top navbar-toggleable-sm navbar-inverse bg-primary mb-3">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#collapsingNavbar">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="flex-row d-flex">
            <IndexLink to="/" className="navbar-brand mb-1">
                <img src={this.props.logo} width={"50px"} alt="TeeWrap" />
            </IndexLink>
            <button type="button" className="hidden-md-up navbar-toggler" data-toggle="offcanvas" title="Toggle responsive left sidebar">
                <span className="navbar-toggler-icon"></span>
            </button>
        </div>
        <div className="navbar-collapse collapse" id="collapsingNavbar">
            <ul className="navbar-nav">
                <li className="nav-item active">
                    <IndexLink to="/" className="nav-link">
                        Home
                    </IndexLink>
                </li>
                <Link className="nav-link" to="/features">Features</Link>
                <Link className="nav-link" to="/products">Products</Link>
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/about">About</Link>
            </ul>
            <ul className="navbar-nav ml-auto">
                <UserProfile user={user}  handleLogout={this.onLogoutClick} />
                {!user &&
                <Link className="nav-link" to="/signup">
                    <i className="fa fa-user-plus" style={{ marginRight: "0.5em" }} />
                      Signup
                </Link>
                }
            </ul>
        </div>
    </nav>
  }
}

Header.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired,
  location: React.PropTypes.object
};
