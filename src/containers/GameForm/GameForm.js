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
      minPlayers: '',
      maxPlayers: '',
      numberOfPlayers: '',
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
      let state = this.state;
      let gameItem = {
        title: state.title,
        category: state.category,
        objective: state.objective,
        numberOfPlayers: state.minPlayers + "-" + state.maxPlayers,
        playerAgeRange: state.playerAgeRange,
        rules: state.rules
      };
      // checking for empty form fields and to verify that players are numbers and not strings
      // TODO add different alerts for the user if they make a mistake while adding a game.
      if ((gameItem.title !== "") &&
          (gameItem.category !== "") &&
          (gameItem.objective !== "") &&
          (gameItem.rules !== "") &&
          (Number.isInteger(Number(state.minPlayers))) &&
          (Number.isInteger(Number(state.maxPlayers))) &&
          (state.minPLayers < state.maxPlayers) &&
          (state.minPLayers !== '') &&
          (state.maxPlayers !== '') &&
          (gameItem.numberOfPlayers !== "") &&
          (gameItem.playerAgeRange !== "")) {
        // calling the add a new game action
        this.props.newGame(JSON.stringify(gameItem));
        // navigating to the specified endpoint after submitting game
        this.props.history.push(endpoint);
      } else {
        console.log("na ah ah, you didnt say the magic word");
      }
      // resetting the state after submitting the game data
      this.setState({
        title: '',
        category: 'card',
        objective: '',
        rules: '',
        minPlayers: '',
        maxPlayers: '',
        numberOfPlayers: '',
        playerAgeRange: 'under 7'
      })
    }
  };

  componentWillMount() {
    // if (!this.props.state.token) {
    //   this.props.history.push('/webpage/logout');
    // }
  }

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

        {/*<fieldset className="">
          <legend>Number of Players</legend>
          <div className="radio_buttons_cat">
            {this.createRadioButtons(buttonData[1], 'numberOfPlayers')}
          </div>
        </fieldset>*/}

        <fieldset className="">
          <legend>Age Range</legend>
          <div className="radio_buttons_cat">
            {this.createRadioButtons(buttonData[2], 'playerAgeRange')}
          </div>
        </fieldset>

        <div className="" style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
          <input style={{flexBasis: '40%'}} className="form-control" onChange={this.handleUpdateState('minPlayers')} value={this.state.minPlayers} placeholder="Minimum players" required/>
          <div style={{backgroundColor: '#02558b', width: '3rem', height: '0.2rem'}}></div>
          <input style={{flexBasis: '40%'}} className="form-control" onChange={this.handleUpdateState('maxPlayers')} value={this.state.maxPlayers} placeholder="Maximum players" required/>
        </div>

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
const mapStateToProps = (state) => {
  return {state: state}
}

const mapDispatchToProps = (dispatch) => {
  return {
    newGame: (payload) =>
    dispatch(newGame(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(GameForm)
