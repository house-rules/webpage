import React, { Component } from 'react';

export default class AddAlternate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      objective: '',
      rules: ''
    }
  }

  handleUpdateState = (field) => {
    return (event) => {
      this.setState({[field]: event.target.value})
    }
  }

  handleSubmit = (endpoint) => {
    return (event) => {

      event.preventDefault();
      this.setState({
        title: event.target.value,
        objective: event.target.value,
        rules: event.target.value
      })

      let alternateGame = JSON.stringify(this.state);

      if ((this.state.title !== "") &&
          (this.state.objective !== "") &&
          (this.state.rules) !== "") {

        fetch(`https://house-rules-jgwrbs.herokuapp.com/api/game/${this.props.game.id}/alternate`, {
          method: "POST",
          body: alternateGame,
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(response => {
          console.log("RESPONSE: ", response);
        })
        .catch(error => {
          console.log("ERROR: ", error);
        })

        this.setState({
          title: '',
          objective: '',
          rules: ''
        })
        this.props.history.push(`/games/${this.props.game.id}`);
        // this.props.arrowToggle();
      } else {

        console.log("na ah ah, you didnt say the magic word");
        this.setState({
          title: '',
          objective: '',
          rules: ''
        })
      }
    }
  }

  render() {
    return (
      <div className="alternateForm">

        <h4>Add your favorite house rules</h4>

        <div>
          <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game title" required autoFocus/>
        </div>

        <div>
          <input className="form-control" onChange={this.handleUpdateState('objective')} value={this.state.objective} placeholder="Objective" required/>
        </div>

        <div>
          <textarea className="form-control" onChange={this.handleUpdateState('rules')} value={this.state.rules} placeholder="House Rules" required></textarea>
        </div>

        <div className="form_submits">
          <button className="btn" onClick={this.handleSubmit(`/games/${this.props.game.id}`)}>Submit</button>
        </div>

      </div>
    );
  }
}
