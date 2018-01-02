import React, { Component } from 'react';
// import '../../styles/Splash.css';
import './Splash.css';
import { Link } from 'react-router-dom';

export default class Splash extends Component {

  render() {
    return(
      <div className="Splash">
        <img src={require('../../images/house-rules-color.png')} alt="#"/>
        <h3>House Rules</h3>
        <Link to="/webpage/games" className="btn">Enter</Link>
        <div className="swipeIcon">
          <div className="swiper">
          </div>
        </div>
        <p>Swipe Up</p>
      </div>
    );
  }
};
