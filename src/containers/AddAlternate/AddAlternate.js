import React, { Component } from 'react';
import { connect } from 'react-redux';
import { newAlternate, setAlert } from '../../actions/action';
import { bindActionCreators } from 'redux';
import './AddAlternate.css';

class AddAlternate extends Component {
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

        this.props.newAlternate({ id: this.props.game.id, state: this.state})
      } else {
        let fields = []
        // checking all fields for empty strings
        for (var prop in this.state) {
          if (this.state[prop] === '') {
            fields.push(" " + prop.toUpperCase())
          } else {
            // fields.push(this.state[prop])
          }
        };
        this.props.setAlert({type: 'error', message: `${fields} fields cannot be empty`});
      };
    }
  };

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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newAlternate: newAlternate,
    setAlert: setAlert
  }, dispatch)
};

export default connect(null, mapDispatchToProps)(AddAlternate);
