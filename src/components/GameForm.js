import React, { Component } from 'react';

export default class GameForm extends Component {
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
  }

  handleSubmit = (endpoint) => {
    return (event) => {

      event.preventDefault();

      this.setState({
        title: event.target.value,
        category: event.target.value,
        objective: event.target.value,
        numberOfPlayers: event.target.value,
        playerAgeRange: event.target.value,
        rules: event.target.value
      });

      let gameItem = JSON.stringify(this.state);

      if ((this.state.title !== "") &&
          (this.state.category !== "") &&
          (this.state.objective !== "") &&
          (this.state.rules !== "") &&
          (this.state.numberOfPlayers !== "") &&
          (this.state.playerAgeRange !== "")) {

        fetch("https://house-rules-jgwrbs.herokuapp.com/api/game/new",
          {
            method: "POST",
            body: gameItem,
            headers: {
              'Content-Type': 'application/json'
            }
          }
        ).then(response => {
          console.log("RESPONSE: ", response);
        }).catch(err => {
          console.log("ERROR: ", err);
        });

        this.setState({
          title: '',
          category: 'card',
          objective: '',
          numberOfPlayers: '1-2',
          playerAgeRange: 'under 7',
          rules: ''
        });

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
      <div className="gameForm" onLoad={this.props.navToggle}>

          <div className="">
            <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game title" required autoFocus/>
          </div>

          <fieldset className="">
           <legend>Game Category</legend>

           <div className="radio_buttons_cat">

             <div className="form-check">
               <label className="form-check-label">
                 <input type="radio" className="form-check-input" name="options1" id="optionsRadios1" value="card" checked={this.state.category === 'card'} onChange={this.handleUpdateState('category')} />
                  Card
               </label>
             </div>

             <div className="form-check">
               <label className="form-check-label">
                 <input type="radio" className="form-check-input" name="options1" id="optionsRadios2" value="board"
                 checked={this.state.category === 'board'} onChange={this.handleUpdateState('category')} />
                  Board
               </label>
             </div>

             <div className="form-check">
               <label className="form-check-label">
                 <input type="radio" className="form-check-input" name="options1" id="optionsRadios3" value="dice"
                 checked={this.state.category === 'dice'} onChange={this.handleUpdateState('category')} />
                  Dice
               </label>
             </div>

             <div className="form-check">
               <label className="form-check-label">
                 <input type="radio" className="form-check-input" name="options1" id="optionsRadios4" value="recreational sports" checked={this.state.category === 'recreational sports'} onChange={this.handleUpdateState('category')} />
                  Recreational Sports
               </label>
             </div>

           </div>
         </fieldset>



         <fieldset className="">
          <legend>Number of Players</legend>

          <div className="radio_buttons_cat">

            <div className="form-check players_radios">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="options2" id="optionsRadios5" value="1-2" checked={this.state.numberOfPlayers === "1-2"} onChange={this.handleUpdateState('numberOfPlayers')} />
                 1-2
              </label>
            </div>

            <div className="form-check players_radios">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="options2" id="optionsRadio6" value="3-4"
                checked={this.state.numberOfPlayers === "3-4"} onChange={this.handleUpdateState('numberOfPlayers')} />
                 3-4
              </label>
            </div>

            <div className="form-check players_radios">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="options2" id="optionsRadios7" value="5-6"
                checked={this.state.numberOfPlayers === "5-6"} onChange={this.handleUpdateState('numberOfPlayers')} />
                 5-6
              </label>
            </div>

            <div className="form-check players_radios">
              <label className="form-check-label">
                <input type="radio" className="form-check-input" name="options2" id="optionsRadios8" value="7+" checked={this.state.numberOfPlayers === "7+"} onChange={this.handleUpdateState('numberOfPlayers')} />
                 7+
              </label>
            </div>

          </div>
        </fieldset>

        <fieldset className="">
         <legend>Age Range</legend>

         <div className="radio_buttons_cat">

           <div className="form-check players_radios">
             <label className="form-check-label">
               <input type="radio" className="form-check-input" name="options3" id="optionsRadios9" value="under 7" checked={this.state.playerAgeRange === "under 7"} onChange={this.handleUpdateState('playerAgeRange')} />
                under 7
             </label>
           </div>

           <div className="form-check players_radios">
             <label className="form-check-label">
               <input type="radio" className="form-check-input" name="options3" id="optionsRadios10" value="7+"
               checked={this.state.playerAgeRange === "7+"} onChange={this.handleUpdateState('playerAgeRange')} />
                7+
             </label>
           </div>

           <div className="form-check players_radios">
             <label className="form-check-label">
               <input type="radio" className="form-check-input" name="options3" id="optionsRadios11" value="12+"
               checked={this.state.playerAgeRange === "12+"} onChange={this.handleUpdateState('playerAgeRange')} />
                12+
             </label>
           </div>

           <div className="form-check players_radios">
             <label className="form-check-label">
               <input type="radio" className="form-check-input" name="options3" id="optionsRadios12" value="18+" checked={this.state.playerAgeRange === "18+"} onChange={this.handleUpdateState('playerAgeRange')} />
                18+
             </label>
           </div>

         </div>
       </fieldset>


          <div className="">
            <input className="form-control" onChange={this.handleUpdateState('objective')} value={this.state.objective} placeholder="Game Objective" required/>
          </div>

          <div className="">
            <textarea className="form-control" onChange={this.handleUpdateState('rules')} value={this.state.rules} placeholder="Normal Rules" required></textarea>
          </div>

          <div className="form_submits">
            <button className="btn" onClick={this.handleSubmit('/games')}>Submit</button>
            <p className="another_game_link" onClick={this.handleSubmit('/newGame')}>or submit and add another game</p>
          </div>

      </div>
    );
  }
};
