import React, { Component } from 'react';
import '../styles/App.css';
import {loadTokenFromCookie, register, login} from "../actions/action";
import {connect} from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      loginUsername: '',
      loginPassword: ''
    }
  }

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    // const register = this.props.register;
    register(this.state, () => {
      this.setState({
        email: "",
        username: "",
        password: "",
        loginUsername: "",
        loginPassword: ""
       })
     });
   }


  handleLogin = (event) => {
    event.preventDefault();

    // const login = this.props.login;
    login(this.state.loginUsername, this.state.loginPassword, () => {
      this.setState({
          email: "",
          password: ""
      });
    });
   }


  componentWillMount() {
    const loadToken = this.props.loadToken;
    loadToken();
  }


  render() {
    return (
      <div className="App">

        <div className='form-group login'>
          <input type='text' className="form-control" placeholder='Username' value={this.state.loginUsername} onChange={this.handleUpdateState('loginUsername')}/>
          <input type='password' className="form-control" placeholder='Password' value={this.state.loginPassword} onChange={this.handleUpdateState('loginPassword')}/>
          <button className='btn' type='submit'onClick={this.handleLogin}>Log In</button>
        </div>

        <div className='form-group signup'>
          <input type='text' className="form-control" placeholder='Username' value={this.state.username} onChange={this.handleUpdateState('username')}/>
          <input type='email' className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleUpdateState('email')}/>
          <input type='password' className="form-control" placeholder='Password' value={this.state.password} onChange={this.handleUpdateState('password')}/>
          <button className='btn' type='submit'onClick={this.handleRegister}>Sign Up</button>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadToken: () => dispatch(loadTokenFromCookie())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
