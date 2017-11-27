import React, {Component} from 'react';

export default class Loader extends Component {
  render() {
    return (
      <div className="Loader">

        <h5 id="loading-message">Loading Gamelist...</h5>

        <div id="spinner">
          <i className="material-icons">casino</i>
        </div>

      </div>
    )
  }
}
