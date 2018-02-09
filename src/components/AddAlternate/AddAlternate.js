import React, { Component } from 'react';
import './AddAlternate.css';
import services from '../../services/services';

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

      if ((this.state.title !== "") &&
          (this.state.objective !== "") &&
          (this.state.rules) !== "") {

        services.addHouseRules( this.props.game.id, this.state)
        .then(data => {
          console.log(data);
          this.setState({
            title: '',
            objective: '',
            rules: ''
          });
        });

        this.props.history.push(`/webpage/games/${this.props.game.id}`);

      } else {
        console.log("na ah ah, you didnt say the magic word");
        let fields = []
        for (var prop in this.state) {
          if (this.state[prop] === '') {
            fields.push(prop + " cannot be empty")
          } else {
            fields.push(this.state[prop])
          }
        };
        this.setState({
          title: fields[0],
          objective: fields[1],
          rules: fields[2]
        });
      };
    }
  }

  render() {

    return (
      <div className="alternateForm">

        <h4>Add your favorite house rules</h4>

        <div>
          <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game Title" required autoFocus/>
        </div>

        <div>
          <input className="form-control" onChange={this.handleUpdateState('objective')} value={this.state.objective} placeholder="Objective" required/>
        </div>

        <div>
          <textarea className="form-control" onChange={this.handleUpdateState('rules')} value={this.state.rules} placeholder="Your House Rules" required></textarea>
        </div>

        <div className="form_submits">
          <button className="btn" onClick={this.handleSubmit(`/webpage/games/${this.props.game.id}`)}>Submit</button>
        </div>

      </div>
    );
  }
}
