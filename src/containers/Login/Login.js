import React, { Component } from 'react';
import { login, setAlert } from '../../actions/action';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loggingIn: false
    }
  };

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleLogin = (event) => {
    event.preventDefault();
    if ((!this.state.email) || (!this.state.password)) {
      this.props.setAlert("Must enter an email address and password to log in");
    } else {
      this.setState({
        loggingIn: true
      })
      const login = this.props.login;
      login({email: this.state.email, password: this.state.password})
      .then(data => {
        if (data.success) {
          this.props.history.replace('/webpage/games');
        } else {
          this.setState({
              email: "",
              password: "",
              loggingIn: false
          });
        };
      })
    }
  };

  render() {
    return(
      <div className='form-group Login'>
        <input type='text' className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleUpdateState('email')}/>

        <input type='password' className="form-control" placeholder='Password' value={this.state.password} onChange={this.handleUpdateState('password')}/>

        <button className='btn' type='submit'onClick={this.handleLogin}>{this.state.loggingIn ? 'Logging in ...' : 'Log In'}</button>
      </div>
    )
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    login: login,
    setAlert: setAlert
  }, dispatch)
};

export default withRouter(connect(null, mapDispatchToProps)(Login));
