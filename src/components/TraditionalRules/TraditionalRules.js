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
        [
        <p key={2} id="game_rules"
          style={this.state.openReadMore ? {height: "auto", transition: 'height 0.5s'} : {height: '12rem', transition: 'height 0.5s'} }>
          {this.props.rules}
        </p>,

        <div key={3} className="read_more" id="read_more"
          onClick={() => this.setState({openReadMore: !this.state.openReadMore})}>
          {this.state.openReadMore ? "Read Less" : "Read more"}
        </div>
        ]
    )
  }
};

// <div key={1} className='house_rules alert normal_rules'>
//   <div>
//     <h4>Traditional rules</h4>
//     <div className="alt_games_link " onClick={() => utils.scrollTo('altGamesList')}>...or try a different spin on the game</div>
//   </div>
// </div>,
