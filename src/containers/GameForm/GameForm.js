import React, { Component } from 'react';
import { newGame, setAlert } from '../../actions/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
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
      // TODO clean up the logic in this function
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
      if ((gameItem.title !== '') && (gameItem.objective !== '') && (gameItem.rules !== '') && (state.minPLayers !== '') && (state.maxPlayers !== '') && (gameItem.numberOfPlayers !== '')) {

          if ((Number.isInteger(Number(state.minPlayers))) &&      (Number.isInteger(Number(state.maxPlayers)))) {
            let min = Number(state.minPlayers);
            let max = Number(state.maxPlayers);

              if (min < max) {
                  // calling the add a new game action
                  this.props.newGame(JSON.stringify(gameItem));
                  // navigating to the specified endpoint after submitting game
                  this.props.history.push(endpoint);
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
                  });
              } else {
                  this.props.setAlert({type: 'error', message: 'Maximum players must be greater than Minimum players'})
              };
          } else {
            this.props.setAlert({type: 'error', message: 'Minimum / Maximum players must be numbers'});
          };
      } else {
        this.props.setAlert({type: 'error', message: 'All fields are required'});
      };
    };
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
  return bindActionCreators({
    newGame: newGame,
    setAlert: setAlert
  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameForm));