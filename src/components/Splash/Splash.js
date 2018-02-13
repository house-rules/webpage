import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Login from '../../containers/Login/Login';
import Register from '../../containers/Register/Register';
import { destroyCookie } from '../../actions/action';
import './Splash.css';

class Splash extends Component {
  constructor() {
    super()
    this.state = {
      showLogin: false,
      showRegister: false
    }
  };

  componentDidMount() {
    if (!this.props.token) {
      this.setState({showLogin: true})
    }
  };

  // will render when current endpoint doesnt match an routes in index.js
  // For example: When running as a PWA on initial load.
  render() {
    return(
      <div className="Splash">
        <img src={require('../../images/house-rules-white-red.png')} alt="#"/>

        {this.props.user.username !== null ? <p className="welcome">{"Welcome back " + this.props.user.username}</p> : ''}
        {this.props.user.username !== null ? <p className="not-me">{'Not ' + this.props.user.username + '? ' }<span onClick={() => this.props.destroyCookie()}>Log in.</span></p> : ''}

        {!this.props.token ? '' : link }

        {this.props.token ? '' : <Login user={this.props.user} /> }
      </div>
    );
  }
};

const link = <Link to="/webpage/games" className="btn">Enter</Link>;

const mapStateToProps = (state) => {
  return {
    token: state.token,
    user: state.user
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    destroyCookie: () =>
      dispatch(destroyCookie())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Splash);
