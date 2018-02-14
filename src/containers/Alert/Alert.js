import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setAlert } from '../../actions/action';
import './Alert.css';

class Alert extends Component {

  render() {
    console.log(this.props.alert);
    let classNm,
        blue = 'rgba(34, 204, 255, 0.9)',
        red  = 'rgba(255, 83, 61, 0.9)',
        gray = 'rgba(125,125,125,0.8)';
        
    if (this.props.alert.message === null) {
      classNm = "Alert hide"
    } else {
      classNm = "Alert"
    }

    return(
      <div className={classNm} style={this.props.alert.type === 'success' ? {backgroundColor: blue} : this.props.alert.type === 'error' ? {backgroundColor: red} : {backgroundColor: gray}}>
        <div className="alert-message">{this.props.alert.message}</div>
        <i className="material-icons" onClick={() => this.props.setAlert({type: null, message: null})}>clear</i>
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
