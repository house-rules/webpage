import React, { Component } from 'react';
import { newGame } from '../../actions/action';
import { connect } from 'react-redux';
import buttonData from './buttonData';
import './GameForm.css';

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      category: 'card',
      objective: '',
      numberOfPlayers: '1-2',
      playerAgeRange: 'under 7',
      rules: ''
    };
  };

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value});
    }
  };

  createRadioButtons = (array, field) => {
    return array.map((button,index) => {
      return <div key={index} className={button.className}>
               <label className="form-check-label">
                 <input type="radio" className="form-check-input" name={button.name} id={button.id} value={button.value} checked={this.state[field] === button.checked} onChange={this.handleUpdateState(field)} />
                  {button.text}
               </label>
             </div>
    })
  };

  handleSubmit = (endpoint) => {
    return (event) => {
      event.preventDefault();
      
      let gameItem = JSON.stringify(this.state);
      // checking for empty form fields
      if ((this.state.title !== "") &&
          (this.state.category !== "") &&
          (this.state.objective !== "") &&
          (this.state.rules !== "") &&
          (this.state.numberOfPlayers !== "") &&
          (this.state.playerAgeRange !== "")) {
        // calling the add a new game function
        this.props.newGame(gameItem);

        // resetting the state after submitting the game data
        this.setState({
          title: '',
          category: 'card',
          objective: '',
          numberOfPlayers: '1-2',
          playerAgeRange: 'under 7',
          rules: ''
        });
        // navigating to the specified endpoint after submitting game
        this.props.history.push(endpoint);
      } else {
        console.log("na ah ah, you didnt say the magic word");
        this.setState({
          title: '',
          category: 'card',
          objective: '',
          rules: '',
          numberOfPlayers: '1-2',
          playerAgeRange: 'under 7'
        })
      }
    }
  };

  render() {
    return (
      <div className="gameForm">

        <div className="">
          <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game title" required autoFocus/>
        </div>

        <fieldset className="">
         <legend>Game Category</legend>
          <div className="radio_buttons_cat">
            {this.createRadioButtons(buttonData[0], 'category')}
          </div>
        </fieldset>

        <fieldset className="">
          <legend>Number of Players</legend>
          <div className="radio_buttons_cat">
            {this.createRadioButtons(buttonData[1], 'numberOfPlayers')}
          </div>
        </fieldset>

        <fieldset className="">
          <legend>Age Range</legend>
          <div className="radio_buttons_cat">
            {this.createRadioButtons(buttonData[2], 'playerAgeRange')}
          </div>
        </fieldset>

        <div className="">
          <input className="form-control" onChange={this.handleUpdateState('objective')} value={this.state.objective} placeholder="Game Objective" required/>
        </div>

        <div className="">
          <textarea className="form-control" onChange={this.handleUpdateState('rules')} value={this.state.rules} placeholder="Normal Rules" required></textarea>
        </div>

        <div className="form_submits">
          <button className="btn" onClick={this.handleSubmit('/webpage/games')}>Submit</button>
          <p className="another_game_link" onClick={this.handleSubmit('/webpage/newGame')}>or submit and add another game</p>
        </div>

      </div>
    );
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    newGame: (payload) =>
    dispatch(newGame(payload))
  }
};

export default connect(null, mapDispatchToProps)(GameForm)
