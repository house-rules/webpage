import React, { Component } from 'react';

export default class DesktopMessage extends Component {

  //should only show when in desktop mode until I can complete it.
  // TODO trash this whole component once desktop styling is done.
  render() {
    return (
      <div id="desktop_message">
        <div id="message">
          <div>
            <h3>House Rules will be optimized for desktop soon.</h3>
            <h5>Until then, view this site through the browser of your iPhone or Android device, or open the Chrome developer tools on your computer <span>( <span id="mac">mac:</span> command + option + i, <span id="windows">windows:</span> F12 or control + shift + i)</span> and click the 'Toggle device toolbar'.</h5>
          </div>
          <div id="image">
            <img src={require('../../images/chrome-dev-toggle-device.png')} alt="#"/>
            <p>Toggle device toolbar</p>
          </div>
        </div>
        <div id="HR-screens">
          <div className="screens">
            <img src={require('../../images/HR-gameList-screen.png')} alt="#"/>
            <span>Game List</span>
          </div>
          <div className="screens">
            <img src={require('../../images/HR-singleGame-screen.png')} alt="#"/>
            <span>Single Game</span>
          </div>
          <div className="screens">
            <img src={require('../../images/HR-HouseRules-screen.png')} alt="#"/>
            <span>House Rules</span>
          </div>
          <div className="screens">
            <img src={require('../../images/HR-addRules-screen.png')} alt="#"/>
            <span>Adding Rules</span>
          </div>
        </div>
      </div>
    )
  }
}
