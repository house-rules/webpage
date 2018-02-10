import React, { Component } from 'react'
import utils from '../../utilities/utilities';
import './TopButton.css';

export default class TopButton extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showButton: false
    }
  };

  componentDidMount() {
    window.addEventListener('scroll', this.showButton);
  };

  componentWillUnmount() {
    window.removeEventListener('scroll', this.showButton);
  };

  showButton = () => {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
      this.setState({buttonShown: true});
    } else {
      this.setState({buttonShown: false});
    }
  };

  render() {
    return(
      <div id="top_arrow" className={this.state.buttonShown ? 'slideUp' : 'slideDown'}>
        <div onClick={() => utils.scrollTo('myNavBar')}>
          <i className="material-icons md-36 top_arrow slideDown">arrow_upward</i>
        </div>
      </div>
    )
  }
};
