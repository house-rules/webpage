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
    console.log('fired');
// const register = this.props.register;
    register(this.state, () => {
      this.setState({
        email: "",
        username: "",
        password: "",
        loginUsername: "",
        loginPassword: ""
      });
      console.log("This.state: ",this.state);
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
      console.log('This.state: ', this.state);
    });
   }


  componentWillMount() {
    const loadToken = this.props.loadToken;
    loadToken();
  }


  render() {
    // console.log("Username: ", this.state.username);
    // console.log("Email: ", this.state.email);
    // console.log("Password: ", this.state.password);
    // console.log("Login Username: ", this.state.loginUsername);
    // console.log("Login Password: ", this.state.loginPassword);
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

        <div id="desktop_message">
          <div id="message">
            <div>
              <h3>House Rules will be optimized for desktop soon.</h3>
              <h5>Until then, view this site through the browser of your iPhone or Android device, or open the Chrome developer tools on your computer <span>( <span id="mac">mac:</span> command + option + i, <span id="windows">windows:</span> F12 or control + shift + i)</span> and click the 'Toggle device toolbar'.</h5>
            </div>
            <div id="image">
              <img src={require('../images/chrome-dev-toggle-device.png')} alt="#"/>
              <p>Toggle device toolbar</p>
            </div>
          </div>
          <div id="HR-screens">
            <div className="screens">
              <img src={require('../images/HR-gameList-screen.png')} alt="#"/>
              <span>Game List</span>
            </div>
            <div className="screens">
              <img src={require('../images/HR-singleGame-screen.png')} alt="#"/>
              <span>Single Game</span>
            </div>
            <div className="screens">
              <img src={require('../images/HR-HouseRules-screen.png')} alt="#"/>
              <span>House Rules</span>
            </div>
            <div className="screens">
              <img src={require('../images/HR-addRules-screen.png')} alt="#"/>
              <span>Adding Rules</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
    return {};
}

const mapDispatchToProps = (dispatch) => {
  //map register and login to props???
    return {
        loadToken: () => dispatch(loadTokenFromCookie())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
