import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import services from '../../services/services';
import './AlternatesList.css';

class AlternatesList extends Component {

  mapAlternates = (alternates) => {
    return alternates.map((game) => {
      return (
        <div className="each_alternate card-block" key={game.id}>
          <div className="alt_game_label">
            <div className="initial_container">
              <h3 className="alternate_initial">
                <img src={require('../../images/house-rules-white.png')} alt="#"/>
              </h3>
            </div>
            <div className="title_container">
              <h4 className="alternate_title">{game.title}</h4>
            </div>

            <button className='btn arrowButton2' data-toggle="collapse" data-target={"#" + game.id}><i className="material-icons" id="myArrow">expand_more</i></button>
          </div>

          <div id={game.id} className="collapse alt_rules">

            <Link to="#" id="delete_rules_button" className="btn" onClick={() => services.deleteHouseRules(`${this.props.selectedGame.id}`, `${game.id}`)}><i className="material-icons">delete</i></Link>

            <div>
              <h5 className="game_labels">Objective</h5>
              <h4>{game.objective}</h4>
              <h5 className="game_labels">New Rules</h5>
              <p>{game.rules}</p>
            </div>
          </div>

        </div>
      )
    });

  };

  render() {
    let alternatesList
    if (this.props.alternates) {
      alternatesList =  this.mapAlternates(this.props.alternates)
    }
    return(
      <div className="AlternatesList">
        <h3 className="alt_list_header">{alternatesList && alternatesList.length === 0 ? 'Be the first to add House Rules for this game' : ''}</h3>
        {alternatesList}
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    alternates: state.selectedGame.alternates
  }
};

export default connect(mapStateToProps)(AlternatesList);
