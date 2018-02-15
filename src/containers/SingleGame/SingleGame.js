import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { gameSelected } from '../../actions/action';
import AddAlternate from '../AddAlternate/AddAlternate';
import AlternatesList from '../AlternatesList/AlternatesList';
import TopButton from '../../components/TopButton/TopButton';
import services from '../../services/services';
import utils from '../../utilities/utilities';
import './SingleGame.css';

class SingleGame extends Component {

  // TODO need to use state to manipulate dom, not getElementById.
  arrowToggle = () => {
    var backArrow = document.getElementById('myArrow');

    if (backArrow.className === "material-icons") {
      backArrow.className += " rotate";
    } else {
      backArrow.className = "material-icons";
    }
  };

  // TODO need to use state to manipulate dom, not getElementById.
  toggleReadMore = () => {
    let gameRules = document.getElementById('game_rules');
    let readMore = document.getElementById('read_more');

    if (gameRules.style.height === "auto") {
      gameRules.style.height = "12rem";
      gameRules.style.transition = "height 0.5s";
      readMore.textContent = "Read more";
    } else {
      gameRules.style.height="auto";
      gameRules.style.transition = 'height 0.5s';
      readMore.textContent = "Read Less";
    }
  };

  handleDeleteGame = (gameId) => {
    services.deleteGame(gameId);
    this.props.history.push('/webpage/games');
  };

  componentDidMount() {
    utils.scrollTo('myNavBar');
  };

  render() {
        if (!this.props.selectedGame) {
          // using a fetch call if the filter is undefined
          const id = this.props.match.params.id;
          services.fetchSingleGame(id)
          .then(data => {
            this.props.gameSelected(data);
          });
        }

        let game = this.props.selectedGame;
        let gameCategory = this.props.selectedGame.category;

    return (
      <div className="singleGame" id="singleGame">
        <div className='card card-block'>
          <div className="title_block">

            <div>
              <h2 className='card-title alert'>{game.title}</h2>
            </div>

            <div className="arrow_container">
              <Link to='/webpage/games'>
                <i className="material-icons md-36">arrow_back</i>
              </Link>
            </div>

          </div>

          <div className='alert icon_bar'>

            <div>
              <i className="material-icons group" id={game.category}>{utils.getIconType(gameCategory)}</i>
              <p>Category</p>
              <p>{game.category}</p>
            </div>

            <div>
              <i className="material-icons group">group</i>
              <p>Players</p>
              <p className=''>{game.numberOfPlayers}</p>
            </div>

            <div>
              <i className="material-icons face">face</i>
              <p>Ages</p>
              <p className=''>{game.playerAgeRange}</p>
            </div>

          </div>

          <div className='alert game_objective'>
            <h5>How to Win</h5>
            <p>{game.objective}</p>
          </div>

          <div className='house_rules alert normal_rules'>
            <div>
              <h4>Traditional rules</h4>
              <div className="alt_games_link " onClick={() => utils.scrollTo('altGamesList')}>...or try a different spin on the game</div>
            </div>
          </div>

          <p id="game_rules">{game.rules}</p>
          <div className="read_more" id="read_more" onClick={() => this.toggleReadMore()}>Read more</div>

          {this.props.loggedIn ?
            <button className='btn arrowButton' data-toggle="collapse" data-target="#demo"onClick={this.arrowToggle}>
              Add Rules
              <i className="material-icons" id="myArrow">add</i>
            </button>
          : '' }

          {this.props.loggedIn ? <div id="demo" className="collapse">
            <AddAlternate game={this.props.selectedGame} history={this.props.history} arrowToggle={() => this.arrowToggle()} />
          </div> : ''}

          <div id="altGamesList">

            <AlternatesList />

          </div>

        </div>

        {/*add this back in the delete_button after user login works---
          onClick={() => this.handleDeleteGame(`${game.id}`)}*/}

        <Link to="#" id="delete_button" className="btn" ><i className="material-icons">delete</i></Link>

        <TopButton />

        <div className="footer">
        </div>

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    gamesList: state.gamesList,
    selectedGame: state.selectedGame,
    loggedIn: !!state.token
  }
};

const mapDispatchToProps = (dispatch) => {
    return {
        gameSelected: (payload) => dispatch(gameSelected(payload))
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SingleGame));
