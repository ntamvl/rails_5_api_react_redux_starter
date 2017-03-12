import React, { PropTypes } from "react";
import { Link } from "react-router";

const UserProfile = ({ user, handleLogout }) => {
  if (!user) {
    return (
      <Link className="nav-link" to="/login">
        <i className="fa fa-sign-in" style={{ marginRight: "0.5em" }} />
          Login
      </Link>
    )
  }

  return (
    <li className="dropdown nav-item">
      <a
        href="#"
        className="dropdown-toggle nav-link"
        data-toggle="dropdown"
        role="button"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <span className="fa fa-user" style={{ marginRight: "0.5em" }} />
        {user.username || "Anonymous"}
        <span className="caret" />
      </a>
      <ul className="dropdown-menu" style={{ right: 0, left: "auto" }}>
        { user ? (
        <a className="dropdown-item" href="#" onClick={handleLogout}>
          <i className="fa fa-sign-out" style={{ marginRight: "0.5em" }} />
          Logout
        </a>
        ) : (
        <a className="dropdown-item" href="/login">
          <i className="fa fa-sign-in" style={{ marginRight: "0.5em" }} />
          Login
        </a>
        )
        }
        <div className="dropdown-divider" />
        <a
          className="dropdown-item"
          href="https://github.com/ntamvl/rails_5_api_react_redux_starter"
          target="_blank"
          title="View on Github"
        >
          <i className="fa fa-github" style={{ marginRight: "0.5em" }} />Github
        </a>
      </ul>
    </li>
  );
};

UserProfile.propTypes = {
  user: PropTypes.object,
  handleLogout: PropTypes.func.isRequired
};

export default UserProfile;
