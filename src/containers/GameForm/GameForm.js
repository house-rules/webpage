import React, { Component } from 'react';
import { newGame, setAlert } from '../../actions/action';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import buttonData from './buttonData';
import utils from '../../utilities/utilities';
import './GameForm.css';

class GameForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1,
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
      return (
        <div key={index} className={button.className} style={{flexBasis: "50%", textAlign: "center", alignItems: "center", marginTop: "0.75rem"}}>

            <label className="form-check-label" style={{display: "flex", flexDirection: "column", justifyContent: "space-around"}}>

                <input type="radio" className="form-check-input" name={button.name} id={button.id} value={button.value} checked={this.state[field] === button.checked} onChange={this.handleUpdateState(field)}/>

                <i className="material-icons"
                style={this.state[field] === button.checked ?
                {backgroundColor: "var(--action-color)", transform: "scale(1.1)"} :
                {backgroundColor: "darkgray", transform: "scale(0.9)"}}>
                  {utils.getIconType(button.value)}
                </i>

                <p style={this.state[field] === button.checked ? {color: "var(--action-color)",margin: "0", fontSize: "16px"} : {color: "darkgray",margin: "0", fontSize: "16px"}}>
                    {button.text}
                </p>

            </label>

        </div> );
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

        <div className="nav-tabs"
             style={this.state.activeTab === 2 ? {transform: "translateX(-100vw)"}:
             this.state.activeTab === 3 ? {transform: "translateX(-200vw)"}: {}}>

          <div id="tab1" className="tabs">
            <div className="">
              <label>Title</label>
              <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game title" required/>
            </div>
            <div className="">
              <label>How do you win?</label>
              <textarea className="form-control" onChange={this.handleUpdateState('objective')} value={this.state.objective} placeholder="Game Objective" required></textarea>
            </div>

            <fieldset className="">
             <label>Game Category</label>
              <div className="radio_buttons_cat" style={{width: '90%', margin: '0 auto'}}>
                {this.createRadioButtons(buttonData[0], 'category')}
              </div>
            </fieldset>
          </div>

          <div id="tab2" className="tabs" style={{textAlign: "center"}}>
            <div className="players-input" style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center'}}>
              <label style={{flexBasis: "100%"}}>How many players?</label>
              <div style={{flexBasis: '30%', height: "6rem"}}>
                <input style={{height: "6rem", border: "none", borderBottom: "3px solid var(--secondary-color)"}} className="form-control" onChange={this.handleUpdateState('minPlayers')} value={this.state.minPlayers} placeholder="1" required/>
                <p style={{marginTop: "0.5rem"}}>Minimum</p>
              </div>
              <div style={{backgroundColor: '#02558b', width: '5rem', height: '0.2rem', boxShadow: "5px 5px 15px rgba(0,0,0,0.3)", margin: "0 0.5rem"}}></div>
              <div style={{flexBasis: '30%', height: "6rem"}}>
                <input style={{height: "6rem", border: "none", borderBottom: "3px solid var(--secondary-color)"}} className="form-control" onChange={this.handleUpdateState('maxPlayers')} value={this.state.maxPlayers} placeholder="50" required/>
                <p style={{marginTop: "0.5rem"}}>Maximum</p>
              </div>
            </div>

            <fieldset className="">
              <label>Age Range</label>
              <div className="radio_buttons_cat">
                {this.createRadioButtons(buttonData[2], 'playerAgeRange')}
              </div>
            </fieldset>
          </div>

          <div id="tab3" className="tabs">
            <div className="">
              <label>The Rules</label>
              <textarea className="form-control" onChange={this.handleUpdateState('rules')} value={this.state.rules} placeholder="Normal Rules" required></textarea>
            </div>

            <div className="form_submits">
              <button className="btn" onClick={this.handleSubmit('/webpage/games')}>Submit</button>
              <p className="another_game_link" onClick={this.handleSubmit('/webpage/newGame')}>or submit and add another game</p>
            </div>
          </div>

        </div>

        <div className='tab-arrows' style={{display: 'flex', justifyContent: 'space-between'}}>
           <div>
            {this.state.activeTab > 1 ? <i className="material-icons"
               onClick={() => this.setState({activeTab: this.state.activeTab - 1})}>arrow_back</i> : ''}
          </div>
          <div>
            {this.state.activeTab < 3 ? <i className="material-icons"
               onClick={() => this.setState({activeTab: this.state.activeTab + 1})}>arrow_forward</i> : ''}
          </div>
        </div>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return { state: state }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newGame: newGame,
    setAlert: setAlert
  }, dispatch)
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameForm));
