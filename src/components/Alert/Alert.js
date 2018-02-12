import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/action';
import './Alert.css';

class Alert extends Component {

  render() {
    let classNm;
    if (this.props.message === null) {
      classNm = "Alert hide"
    } else {
      // console.log(this.props.message);
      classNm = "Alert"
    }

    return(
      <div className={classNm}>
        {this.props.message}
        <i className="material-icons" onClick={() => this.props.setAlert(null)}>clear</i>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {message: state.alert};
}

// TODO add action to remove an alert message with mapDispatchToProps.
const mapDispatchToProps = (dispatch) =>{
  return {
    setAlert: (payload) =>
      dispatch(setAlert(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
