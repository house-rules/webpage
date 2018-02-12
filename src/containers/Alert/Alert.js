import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/action';
import './Alert.css';

class Alert extends Component {

  render() {
    let classNm;
    if (this.props.alert === null) {
      classNm = "Alert hide"
    } else {
      classNm = "Alert"
    }

    return(
      <div className={classNm}>
        <div className="alert-message">{this.props.alert}</div>
        <i className="material-icons" onClick={() => this.props.setAlert(null)}>clear</i>
      </div>
    )
  }
};

const mapStateToProps = (state) => {
  return {alert: state.alert};
}

// TODO add action to remove an alert message with mapDispatchToProps.
const mapDispatchToProps = (dispatch) =>{
  return {
    setAlert: (payload) =>
      dispatch(setAlert(payload))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alert);
