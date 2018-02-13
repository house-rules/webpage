import React, { Component } from 'react';
import DesktopMessage from '../../components/DesktopMessage/DesktopMessage';
// import '../../styles/App.css';
import './App.css';
import { loadTokenFromCookie, register, login, setAlert } from "../../actions/action";
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
      loggingIn: false
    }
  };

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleRegister = (event) => {
    event.preventDefault();
    if ((!this.state.email) || (!this.state.username) || (!this.state.password)) {
      this.props.setAlert("Must enter an email address, username, and password to register");
    } else {
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
  };

  handleLogin = (event) => {
    event.preventDefault();
    if ((!this.state.loginEmail) || (!this.state.loginPassword)) {
      this.props.setAlert("Must enter an email address and password to log in");
    } else {
      this.setState({
        loggingIn: true
      })
      const login = this.props.login;
      login({email: this.state.loginEmail, password: this.state.loginPassword})
      .then(data => {
        this.setState({
            email: "",
            password: "",
            loggingIn: false
        });
      })
    }

  };

  componentWillMount() {
    const loadToken = this.props.loadToken;
    loadToken();
  };

  render() {
    return (
          <div className="App">
            <div className='form-group login'>
              <input type='text' className="form-control" placeholder='Email' value={this.state.loginEmail} onChange={this.handleUpdateState('loginEmail')}/>
              <input type='password' className="form-control" placeholder='Password' value={this.state.loginPassword} onChange={this.handleUpdateState('loginPassword')}/>
              <button className='btn' type='submit'onClick={this.handleLogin}>{this.state.loggingIn ? 'Logging in ...' : 'Log In'}</button>
            </div>

            <div className='form-group signup'>
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
    return {alert: state.alert};
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      loadToken: loadTokenFromCookie,
      register: register,
      login: login,
      setAlert: setAlert
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
