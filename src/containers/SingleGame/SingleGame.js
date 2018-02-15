import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { gameSelected } from '../../actions/action';
import TraditionalRules from '../../components/TraditionalRules/TraditionalRules';
import AddAlternate from '../AddAlternate/AddAlternate';
import AlternatesList from '../AlternatesList/AlternatesList';
import TopButton from '../../components/TopButton/TopButton';
import services from '../../services/services';
import utils from '../../utilities/utilities';
import './SingleGame.css';

class SingleGame extends Component {
  constructor() {
    super()
    this.state = {
      openAlternatesForm: false,
      openReadMore: false
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
    let game = this.props.selectedGame;
    if (!game) {
      // using a fetch call if the filter is undefined
      const id = this.props.match.params.id;
      services.fetchSingleGame(id)
      .then(data => {
        this.props.gameSelected(data);
      });
    };

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
              <i className="material-icons group" id={game.category}>{utils.getIconType(game.category)}</i>
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

          <TraditionalRules rules={game.rules}/>

          {this.props.loggedIn ?
            <button className='btn arrowButton' data-toggle="collapse" data-target="#demo"onClick={() => this.setState({openAlternatesForm: !this.state.openAlternatesForm})}>
              Add Rules
              <i className={this.state.openAlternatesForm ? "material-icons rotate" : 'material-icons'} id="myArrow">add</i>
            </button>
          : '' }

          {this.props.loggedIn ? <div id="demo" className="collapse">
            <AddAlternate game={this.props.selectedGame} />
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
