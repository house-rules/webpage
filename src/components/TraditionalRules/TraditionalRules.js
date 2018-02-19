import React, { Component } from 'react';
// import utils from '../../utilities/utilities';

export default class TraditionalRules extends Component {
  constructor(props) {
    super(props)
    this.state = {
      openReadMore: false
    }
  };

  render() {
    return(
        <div className='traditional_rules'>
          <p id="game_rules"
            style={this.state.openReadMore ? {height: "auto", transition: 'height 0.5s'} : {height: '15rem', transition: 'height 0.5s'} }>
            {this.props.rules}
          </p>,

          <div className="read_more btn" id="read_more"
            onClick={() => this.setState({openReadMore: !this.state.openReadMore})}>
            {this.state.openReadMore ? "Read Less" : "Read more"}
          </div>
        </div>
    )
  }
};
