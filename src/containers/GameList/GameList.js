import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getGameList, gameSelected, setFilter } from '../../actions/action';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import Loader from '../../components/Loader/Loader';
import GameFilter from '../GameFilter/GameFilter';

import './GameList.css';

class GameList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: <Loader />
    }
  }

  // handling the icon that shows for each game in the game list
  handleSwitch = (game) => {

    let gameCategory = game.category;
    let gameIcon;

    switch (gameCategory) {
      case "card":
        gameIcon = 'style';
        break;
      case "board":
        gameIcon = 'dashboard';
        break;
      case "dice":
        gameIcon = 'casino';
        break;
      case "recreational sports":
        gameIcon = "golf_course";
        break;
      default:
        gameIcon = "widgets"
    }
    return gameIcon;
  }

  // Function for the api 'GET' call. Returns the entire game list
  componentDidMount() {
    this.props.getGameList();
  };

  render () {
    // sorts array alphabetically
    function compare(a, b) {
      const titleA = a.title.toUpperCase();
      const titleB = b.title.toUpperCase();

      let comparison = 0;
      if (titleA > titleB) {
        comparison = 1;
      } else if (titleA < titleB) {
        comparison = -1;
      }
      return comparison;
    }
    this.props.gamesList.sort(compare);

    // map over game data array
    let returnGameJSX = (game, gameIcon) => {
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
      }

    let gamesList = this.props.gamesList.map((game) => {
        let gameIcon = this.handleSwitch(game);
        return returnGameJSX(game, gameIcon);
      })

    let displayedObject = (gamesList.length ? gamesList : this.state.loader);

    return (
      <div className="GameList">

        <GameFilter />

        {displayedObject}

        <div>
          <Link to='/webpage/newGame'>
            <i className="material-icons md-36 FAB">add</i>
          </Link>
        </div>

        {/*<div id="footer">
        </div>*/}

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  let gamesList;
  if (state.filter === 'all') {
    gamesList = state.gamesList
  } else {
    gamesList = state.gamesList.filter(game => game.category === state.filter)
  }
  return {
    gamesList: gamesList,
    filter: state.filter
  }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getGameList: getGameList,
        gameSelected: gameSelected,
        setFilter: setFilter
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GameList);
