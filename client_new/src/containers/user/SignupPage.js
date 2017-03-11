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
      password_confirmation: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      console.log("------- begin newUser ------- ");
      console.log(nextProps.newUser);
      console.log("nextProps created: " + nextProps.newUser.created);
      console.log("------- end newUser ------- ");
    }
  }

  handleInputChange(event) {
    event.preventDefault;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault;
    const { dispatch } = this.props;
    dispatch(createUser({...this.state}));
    console.log("submitted");
    console.log(this.state);
  }

  render() {
    return (
      <div className="container">
        <div className="form-horizontal">
          <h2>Signup</h2>
          <div className="form-group">
            <label>Name</label>
            <input type="input" className="form-control"
                  aria-describedby="nameHelp"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  placeholder="Enter name" />
            <small className="form-text text-muted">We'll never share your name with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Username</label>
            <input type="input" className="form-control"
                  aria-describedby="usernameHelp"
                  name="username"
                  value={this.state.username}
                  onChange={this.handleInputChange}
                  placeholder="Enter name" />
            <small className="form-text text-muted">We'll never share your name with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Email address</label>
            <input type="email" className="form-control"
                  name="email" aria-describedby="emailHelp"
                  value={this.state.email}
                  onChange={this.handleInputChange}
                  placeholder="Enter email" />
            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" className="form-control"
                  name="password"
                  value={this.state.password}
                  onChange={this.handleInputChange}
                  placeholder="Password" />
          </div>
          <div className="form-group">
            <label>Password confirmation</label>
            <input type="password" className="form-control"
                  name="password_confirmation"
                  value={this.state.password_confirmation}
                  onChange={this.handleInputChange}
                  placeholder="Password confirmation" />
          </div>


          <div className="form-group">
            <div className="controls">
              <button className="btn btn-success" onClick={this.handleSubmit}>Register</button>
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
