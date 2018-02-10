import React, { Component } from 'react';
import DesktopMessage from '../../components/DesktopMessage/DesktopMessage';
import '../../styles/App.css';
import './App.css';
import { loadTokenFromCookie, register, login } from "../../actions/action";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      loginEmail: '',
      loginPassword: '',
      errorMessage: ''
    }
  }

  // TODO need to add some checks for empty fields to catch errors before sending to log in or register

  // TODO eventually have users who are not logged in be able to view games, but not edit. Maybe use a ternary to decide to render certain components. Hiding addGame and addAlternates components.

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    const register = this.props.register;
    register(this.state, () => {
      this.getEndpoint('/webpage/games');
      this.setState({
        email: "",
        username: "",
        password: ""
      });
     });
   }

  handleLogin = (event) => {
    event.preventDefault();
    const login = this.props.login;
    login({email: this.state.loginEmail, password: this.state.loginPassword})
    .then(data => {
      this.setState({
          email: "",
          password: ""
      });
    })
  };

  componentWillMount() {
    const loadToken = this.props.loadToken;
    loadToken();
  };

  render() {
    return (
          <div className="App">
            <div className='form-group login'>
              <div style={{color: '#ff533d'}}>{this.props.state.error ? this.props.state.error : ''}</div>
              <input type='text' className="form-control" placeholder='Email' value={this.state.loginEmail} onChange={this.handleUpdateState('loginEmail')}/>
              <input type='password' className="form-control" placeholder='Password' value={this.state.loginPassword} onChange={this.handleUpdateState('loginPassword')}/>
              <button className='btn' type='submit'onClick={this.handleLogin}>Log In</button>
            </div>

            <div className='form-group signup'>
              <div style={{color: '#ff533d'}}>{/*this.props.state.error ? this.props.state.error + "!" : ''*/}</div>
              <input type='text' className="form-control" placeholder='Username' value={this.state.username} onChange={this.handleUpdateState('username')}/>
              <input type='email' className="form-control" placeholder='Email' value={this.state.email} onChange={this.handleUpdateState('email')}/>
              <input type='password' className="form-control" placeholder='Password' value={this.state.password} onChange={this.handleUpdateState('password')}/>
              <button className='btn' type='submit'onClick={this.handleRegister}>Sign Up</button>
            </div>

            <DesktopMessage />
          </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {state: state};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      loadToken: loadTokenFromCookie,
      register: register,
      login: login
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
