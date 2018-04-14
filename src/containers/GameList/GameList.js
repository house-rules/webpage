import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGameList, gameSelected, setFilter } from '../../actions/action';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loader from '../../components/Loader/Loader';
import GameFilter from '../GameFilter/GameFilter';
import utils from '../../utilities/utilities';
import './GameList.css';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: <Loader />
    }
  };

  returnGameJSX = (game, gameIcon) => {
    return (
    <div key={game.id}
    onClick={() => this.props.gameSelected(game)} className="each_game card-block card">
       <Link to={`/webpage/games/${game.id}`}>
         <div className="game_initial">
           <i className="material-icons group" id={game.category}>{gameIcon}</i>
         </div>
         <div>
           <h4 className="game_title card-title">{game.title}</h4>
           <p className="game_category">{game.Alternates.length <= 0 ? "1 way to play" : `${game.Alternates.length + 1} ways to play`}</p>
         </div>
         <div className="click-arrow">
           <i className="material-icons">keyboard_arrow_right</i>
         </div>
       </Link>
     </div> );
  };

  componentDidMount() {
    // Function for the api 'GET' call. Returns the entire game list
    if (this.props.gamesList.length === 0) {
      this.props.getGameList();
    }
  };

  render () {
    this.props.gamesList.sort(utils.sortGames);

    let gamesList = this.props.gamesList.map((game) => {
        let gameIcon = utils.getIconType(game.category);
        return this.returnGameJSX(game, gameIcon);
      })

    return (
      <div className="GameList">

        <div className='games-container'>
         {gamesList.length ? gamesList : this.state.loader}
        </div>

        <GameFilter />

        {this.props.loggedIn ?
        <div className="FAB">
          <Link to='/webpage/newGame'>
            <p>Add Game</p>
            <div>
              <i className="material-icons md-24">add</i>
            </div>
          </Link>
        </div> : ''}

      </div>
    );
  }
};

const mapStateToProps = (state) => {
  let gamesList;
  if (state.filter === 'all') {
    gamesList = state.gamesList
  } else {
    gamesList = state.gamesList.filter(game => game.category === state.filter)
  }
  return {
    gamesList: gamesList,
    filter: state.filter,
    loggedIn: !!state.token
  }
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGameList: getGameList,
        gameSelected: gameSelected,
        setFilter: setFilter
    }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
