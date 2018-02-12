import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import { destroyCookie } from '../../actions/action';
import { connect } from 'react-redux';
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
    if (endpoint === '/webpage/logout') {
      this.props.destroyCookie();
    }
    this.navToggle(endpoint);
    this.props.history.replace(endpoint)
  }

  render () {
    // creating the nav links below in a map fuction and keep code DRY
    const navOptions = [
      {className: "GamesLink", endpoint: '/webpage/games', icon: 'casino', text: "Games"},
      {className: "NewGameLink", endpoint: '/webpage/newGame', icon: 'add', text: "Add Game"},
      {className: "AboutLink", endpoint: '/webpage/about', icon: 'local_library', text: "About"},
      {className: "LogOutLink", endpoint: '/webpage/logout', icon: 'power_settings_new', text: "Log Out"},
    ];

    let navLinks = navOptions.map((nav, index) => {
      return  <Link key={index}
              className={nav.className} to='#' onClick={() => this.handleNavigation(`${nav.endpoint}`)}>
                <i className="material-icons">{nav.icon}</i>
                {nav.text}
              </Link>
    })

    return (
      <div className='BaseLayout'>

          <nav className={this.state.navOpen ? "topnav responsive" : 'topnav'} id="myNavBar">

            <Link className="Logo" to='#' onClick={() => this.handleNavigation('/webpage/games')}>
              <img src={require('../../images/house-rules-white.png')} alt="#"/>
              <span>House Rules</span>
            </Link>

            {navLinks}

            <div id='icon' className={this.state.navOpen ? 'icon rotate' : 'icon'} onClick={this.navToggle}>
              &#9776;
            </div>

          </nav>

            {this.props.children}

          <div id="top_arrow">
          </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {state: state}
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroyCookie: () =>
    dispatch(destroyCookie())
  }
};

// this is how to set up a connect with the withRouter from browserRouter
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BaseLayout))
