import React, { Component } from 'react';
import './Loader.css';

export default class Loader extends Component {

  // Should only render when preparing to laod the gamesList component
  render() {
    return (
      <div className="Loader">
        <h5 id="loading-message">Loading game list...</h5>
        <div id="spinner">
          <i className="material-icons">casino</i>
        </div>
      </div>
    )
  }
};
