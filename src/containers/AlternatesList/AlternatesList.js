import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import AddAlternate from '../AddAlternate/AddAlternate';
import services from '../../services/services';
import './AlternatesList.css';

const customStyles = {
  overlay: {
    position          : 'fixed',
    top               : 0,
    left              : 0,
    right             : 0,
    bottom            : 0,
    backgroundColor   : 'rgba(0, 0, 0, 0.8)'
  },
  content: {
    position              : 'absolute',
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    background            : 'transparent',
    border                : 'none',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class AlternatesList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isModalOpen: false
    }
  }

  toggleModal = () => {
   this.setState({
     isModalOpen: !this.state.isModalOpen
   });
  };

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
    let n = 1;
    let alternatesList;
    if (this.props.alternates) {
      alternatesList =  this.mapAlternates(this.props.alternates)
    }
    return(
      <div className="AlternatesList">
        <h5 className="alt_list_header" style={alternatesList && alternatesList.length === 0 ? {display: 'block'} : {display: 'none'}}>{alternatesList && alternatesList.length === 0 ? 'Be the first to add House Rules for this game!' : ''}</h5>

        {alternatesList}

        {this.props.loggedIn ?
          <button className='btn arrowButton' onClick={() => this.toggleModal()}>
            Add Your Own Rules
            <i className={this.state.isModalOpen ? "material-icons rotate" : 'material-icons'} id="myArrow">add</i>
          </button>
        : '' }

        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.toggleModal}
          closeTimeoutMS={n}
          shouldCloseOnOverlayClick={true}
          style={customStyles}
          ariaHideApp={false}
          contentLabel="Modal">
          <div className="modal_background">
            <AddAlternate game={this.props.selectedGame} toggleModal={this.toggleModal}/>
          </div>
        </Modal>

      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {
    selectedGame: state.selectedGame,
    alternates: state.selectedGame.alternates,
    loggedIn: !!state.token
  }
};

export default connect(mapStateToProps)(AlternatesList);
