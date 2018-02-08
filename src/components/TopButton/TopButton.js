import React, { Component } from 'react'
import utils from '../../utilities/utilities';
import './TopButton.css';

export default class TopButton extends Component {

  componentDidMount() {
    window.addEventListener('scroll', utils.handleScroll);
  }

  componentShouldUnmount() {
    console.log('componentWillUnmount invoked');
    window.removeEventListener('scroll', utils.handleScroll);
  };

  render() {
    return(
      <div id="top_arrow">
        <div onClick={() => utils.scrollTo('myNavBar')}>
          <i className="material-icons md-36 top_arrow slideDown">arrow_upward</i>
        </div>
      </div>
    )
  }
};
