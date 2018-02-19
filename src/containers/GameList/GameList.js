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
    return <div key={game.id}
    onClick={() => this.props.gameSelected(game)} className="each_game card-block card">
       <Link to={`/webpage/games/${game.id}`}>
         <div className="game_initial">
           <i className="material-icons group" id={game.category}>{gameIcon}</i>
         </div>
         <div>
           <h4 className="game_title card-title">{game.title}</h4>
           <p className="game_category">{game.alternates.length < 1 ? "1 way to play" : `${game.alternates.length + 1} ways to play`}</p>
         </div>
         <div className="click-arrow">
           <i className="material-icons">keyboard_arrow_right</i>
         </div>
       </Link>
     </div>;
  };

  componentDidMount() {
    // Function for the api 'GET' call. Returns the entire game list
    this.props.getGameList();
  };

  render () {
    this.props.gamesList.sort(utils.sortGames);

    let gamesList = this.props.gamesList.map((game) => {
        let gameIcon = utils.getIconType(game.category);
        return this.returnGameJSX(game, gameIcon);
      })

    return (
      <div className="GameList">

        <GameFilter />

        <div className='games-container'>
         {gamesList.length ? gamesList : this.state.loader}
        </div>

        {this.props.loggedIn ?
        <div>
          <Link to='/webpage/newGame'>
            <i className="material-icons md-36 FAB">add</i>
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
