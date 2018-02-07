import React, { Component } from 'react';
import { setFilter } from '../../actions/action';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

class GameFilter extends Component {

  render() {

    return(
      <div className="filter-bar">
        <h5 className="filter_header"> Filter Game Types</h5>

        <Link to="#" onClick={() => this.props.setFilter('all')}>
          <i className="material-icons all_games_filter">dns</i>
          <p><span className="">All</span></p>
        </Link>

        <Link to="#" onClick={() => this.props.setFilter('card')}>
          <i className="material-icons card_hand">style</i>
          <p><span className="">Card</span></p>
        </Link>

        <Link to="#" onClick={() => this.props.setFilter('board')}>
          <i className="material-icons">dashboard</i>
          <p><span className="">Board</span></p>
        </Link>

        <Link to="#" onClick={() => this.props.setFilter('dice')}>
          <i className="material-icons">casino</i>
          <p><span className="">Dice</span></p>
        </Link>

        <Link to="#" onClick={() => this.props.setFilter('recreational sports')}>
          <i className="material-icons">golf_course</i>
          <p><span className="">Sports</span></p>
        </Link>

      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setFilter: (payload) =>
      dispatch(setFilter(payload))
  }
}

export default connect(null, mapDispatchToProps)(GameFilter);
