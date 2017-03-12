import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createUser } from '../../actions/user';
import { usersInvalidatePage } from '../../actions/user';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      email: "",
      password: "",
      password_confirmation: "",
      invalidStyles: {
        nameStyle: "",
        usernameStyle: "",
        passwordStyle: "",
        password_confirmationStyle: "",
        emailStyle: ""
      },
      errors: {
        name: null,
        email: null,
        username: null,
        password: null,
        password_confirmation: null
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.isPassedValidation = this.isPassedValidation.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = nextProps;
    if (nextProps.newUser) {
      if (nextProps.newUser.created) {
        try {
          const redirect = this.props.location.query.redirect;
          this.context.router.replace(redirect);
        } catch (error) {
          this.context.router.replace("/users");
          dispatch(usersInvalidatePage(1));
        }
      }
    }
  }

  renderErrors() {
    const errors = this.state.errors;
    console.log("renderErrors: " + errors);
    if (errors.length > 0) {
      return (
        <div className="alert alert-danger">
          {errors.map(error => (
            <div>{error}</div>
          ))}
        </div>
      )
    } else {
      return (
        <span></span>
      )
    }
  }

  isEmail(email) {
    const emailPattern = /(.+)@(.+){2,}\.(.+){2,}/;
    if (!emailPattern.test(email)) {
      return false;
    }
    return true;
  }

  isPassedValidation() {
    const MIN_LENGTH = 3;
    const { name, username, email, password, password_confirmation } = this.state;
    const isPassedName = name.length >= MIN_LENGTH ? true : false;
    const isPassedUsername = username.length >= MIN_LENGTH ? true : false;
    const isPassedEmail = this.isEmail(email);
    var isPassedPassword = false;
    if (password.length >= MIN_LENGTH && password_confirmation.length >= MIN_LENGTH) {
      isPassedPassword = (password === password_confirmation);
    }

    return isPassedName && isPassedUsername
          && isPassedEmail && isPassedPassword;
  }

  handleInputChange(event) {
    event.preventDefault();
    const target = event.target;
    const value = (target.type === 'checkbox' ? target.checked : target.value);
    const name = target.name;
    this.setState({
      [name]: value
    });

    const nameStyle = name + "Style";
    const invalidStyle = "invalid";
    if (value.length < 3) {
      this.setState({
        invalidStyles: {
          [nameStyle]: invalidStyle
        }
      });
    } else {
      this.setState({
        invalidStyles: {
          [nameStyle]: ""
        }
      });

      if (name === "email") {
        if (!this.isEmail(value)) {
          this.setState({
            invalidStyles: {
              [nameStyle]: invalidStyle
            }
          });
        }
      }
      if (name === "password_confirmation") {
        if (value !== this.state.password) {
          this.setState({
            invalidStyles: {
              [nameStyle]: invalidStyle
            }
          });
        }
      }
    }
  }

  handleSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(createUser({...this.state}));
  }

  render() {
   const { nameStyle, usernameStyle,
            passwordStyle, password_confirmationStyle,
            emailStyle
          } = this.state.invalidStyles;
    const isSubmitted = this.isPassedValidation();
    return (
      <div className="container">
        <div className="form-horizontal">
          <h2>Signup</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="input" className={`form-control ${nameStyle}`}
                  aria-describedby="nameHelp"
                  name="name"
                  ref={(input) => this.name = input}
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter name" />
            <small className="form-text text-muted">We'll never share your name with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="input" className={`form-control ${usernameStyle}`}
                  aria-describedby="usernameHelp"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  placeholder="Enter name" />
            <small className="form-text text-muted">We'll never share your name with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className={`form-control ${emailStyle}`}
                  name="email" aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  placeholder="Enter email" />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className={`form-control ${passwordStyle}`}
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  placeholder="Password" />
          </div>
          <div className="form-group">
            <label>Password confirmation</label>
            <input type="password" className={`form-control ${password_confirmationStyle}`}
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleInputChange}
                  placeholder="Password confirmation" />
          </div>

          <div className="form-group">
            <div className="controls">
              {isSubmitted &&
              <button className="btn btn-success" onClick={this.handleSubmit}>Register</button>
              }
              {!isSubmitted &&
              <button className="btn btn-success" disabled>Register</button>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

SignupPage.PropTypes = {
  dispatch: PropTypes.func.isRequired,
  newUser: PropTypes.object
}

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  const { newUser } = state;
  if (newUser) {
    return {
      newUser: newUser
    }
  }
  return {
    newUser: null
  }
}

export default connect(mapStateToProps)(SignupPage);
