import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import './BaseLayout.css';

class BaseLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      navOpen: false,
      rotateIcon: false
    }
};

  // opens and closes the nav bar on click
  navToggle = (endpoint) => {
      if ((this.state.navOpen === false) && (endpoint !== '/webpage/')) {
        this.setState({
          navOpen: !this.state.navOpen,
          rotateIcon: !this.state.rotateIcon
        })
      } else if (this.state.navOpen === true) {
        this.setState({
          navOpen: !this.state.navOpen,
          rotateIcon: !this.state.rotateIcon
        })
      }
  };

  // this function handles the navigation and then calls the navToggle above to close the navbar
  handleNavigation = (endpoint) => {
    this.props.history.push(endpoint)
    this.navToggle(endpoint);
  }

  render () {
    //TODO add a map function to create the nav links below and keep code DRY
    const navOptions = [
      {className: "GamesLink", endpoint: '/webpage/games', icon: 'casino', text: "Games"},
      {className: "NewGameLink", endpoint: '/webpage/newGame', icon: 'add', text: "Add Game"},
      {className: "AboutLink", endpoint: '/webpage/about', icon: 'local_library', text: "About"},
      {className: "LogOutLink", endpoint: '/webpage/', icon: 'power_settings_new', text: "Log Out"},
    ]

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

            <Link className="Logo" to='#' onClick={() => this.handleNaviagation('/webpage/')}>
              <img src={require('../../images/house-rules-white.png')} alt="#"/>
              <span>House Rules</span>
            </Link>

            {navLinks}

            <div id='icon' className={this.state.rotateIcon ? 'icon rotate' : 'icon'} onClick={this.navToggle}>&#9776;</div>
          </nav>

            {this.props.children}

          <div id="top_arrow">
          </div>
      </div>
    );
  }
};

export default withRouter(BaseLayout);
