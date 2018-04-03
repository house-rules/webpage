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

  //TODO I want to make this a modal so there will be less scrolling for the user.

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

      if ((this.state.title !== "") && (this.state.objective !== "") && (this.state.rules) !== "") {
          this.props.newAlternate({
            id: this.props.game.id,
            title: this.state.title,
            objective: this.state.objective,
            rules: this.state.rules, userId: this.props.user.userId
          });
      } else {
          let fields = []
          // checking all fields for empty strings
          for (var prop in this.state) {
            if (this.state[prop] === '') {
              fields.push(" " + prop)
            }
          };
        this.props.setAlert({type: 'error', message: `${fields} fields cannot be empty`});
      };
    }
  };

  render() {
    console.log(this.props.user);
    return (
      <div className="alternateForm modal_header">

        <h4>Add your favorite house rules</h4>

        <div>
          <input className="form-control" onChange={this.handleUpdateState('title')} value={this.state.title} placeholder="Game Title" required/>
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
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newAlternate: newAlternate,
    setAlert: setAlert
  }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(AddAlternate);
