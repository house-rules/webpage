import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { destroyCookie, loadTokenFromCookie, setAlert } from '../../actions/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Alert from '../Alert/Alert';
import './BaseLayout.css';

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false
    }
  };

  // opens and closes the nav bar on click
  navToggle = (endpoint) => {
      if ((this.state.navOpen === false) && (endpoint !== '/webpage/games')) {
        this.setState({
          navOpen: !this.state.navOpen
        })
      } else if (this.state.navOpen === true) {
        this.setState({
          navOpen: !this.state.navOpen
        })
      }
  };

  // this function handles the navigation and then calls the navToggle above to close the navbar
  handleNavigation = (endpoint) => {
    if (endpoint === '/webpage/login') {
      this.props.destroyCookie();
    }
    this.props.history.replace(endpoint);
    setTimeout(() => this.navToggle(endpoint), 200);
  }

  createNavLinks = () => {
    let user = this.props.user ? `${this.props.user.username}` : ' ';
    let logInOut = this.props.token ? `Log Out • ${user}` : "Log In";
    let iconColor = this.props.token ? {color: '#ff533d', transform: 'scale(1)'} : {};

    // creating the nav links below in a map fuction and keep code DRY
    const navOptions = [
      {className: "GamesLink", endpoint: '/webpage/games', icon: 'casino', text: "Games"},
      {className: "NewGameLink", endpoint: '/webpage/newGame', icon: 'add', text: "Add Game"},
      {className: "AboutLink", endpoint: '/webpage/about', icon: 'local_library', text: "About"},
      {className: "LogOutLink", endpoint: '/webpage/login', icon: 'power_settings_new', text: logInOut, style: iconColor},
    ];

    // TODO for the error message that pops up, I want a button that will navigate to login if pressed.
    return navOptions.map((nav, index) => {
      return  <Link key={index}
                className={nav.className} to='#'
                onClick={nav.text === "Add Game" ? this.props.token ?
                () => this.handleNavigation(`${nav.endpoint}`)
                : () => this.props.setAlert({type: 'error', message: 'Must be logged in to add a game'})
                : () => this.handleNavigation(`${nav.endpoint}`)}>
                <i className="material-icons"
                  style={nav.style ? nav.style : {}}>{nav.icon}</i>
                <p>{nav.text}</p>
              </Link>
    })
  }

  componentWillMount() {
    const loadToken = this.props.loadToken;
    loadToken();
  }

  render () {
    // console.log("Props -->> ", this.props.state);
    let user = this.props.user ? this.props.user : ' ';

    return (
      <div className='BaseLayout'>

          <nav id="myNavBar" className='topnav'>
            <Link className="Logo" to='#' onClick={() => this.handleNavigation('/webpage/games')}>
              <img src={require('../../images/house-rules-white-red.png')} alt="#"/>
              <span>House Rules</span>
            </Link>

            <div id='icon' className={this.state.navOpen ? 'icon rotate' : 'icon'} onClick={this.navToggle}>
              &#9776;
            </div>
          </nav>

          <div className={this.state.navOpen ? "menu shown" : "menu"}>
            <div className='menu-bg'>

              <div className="links">
                <div className='links-top'>
                  <div className="gradient">
                    <h2 className="menu-user">{user.username}</h2>
                    <p>Welcome!</p>
                  </div>
                </div>
                <div className="links-bottom">
                  {this.createNavLinks()}
                </div>
              </div>
              <div className="close-menu">
                <i className="material-icons"
                onClick={this.navToggle}>close</i>
              </div>

            </div>
          </div>

          <Alert />

          {this.props.children}

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user,
    // TODO remove entire state from props after debugging
    state: state
  }
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    destroyCookie: destroyCookie,
    loadToken: loadTokenFromCookie,
    setAlert: setAlert
  }, dispatch)

};

// this is how to set up a connect with the withRouter from browserRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseLayout))
