import React, {Component} from 'react';  
import {connect} from 'react-redux';  
import {bindActionCreators} from 'redux';

import {sendFlashMessage, dismissMessage} from '../../actions/index';

class UserAction extends Component{

  render(){
    return (
      <div className="row">

          <div className="col-md-8 col-md-offset-2">
            <div className="btn-group btn-group-justified" role="group">
              <div className="btn-group" role="group">
                <button
                onClick={() => this.props.sendFlashMessage('You win!', 'alert-success')} 
                className="btn btn-success">Happy Message</button>
              </div>
              <div className="btn-group" role="group">
                <button
                onClick={() => this.props.sendFlashMessage('You\'ve been warned', 'alert-warning')} 
                className="btn btn-warning">Warning</button>
              </div>
              <div className="btn-group" role="group">
                <button
                onClick={() => {
                  this.props.sendFlashMessage('Way to go...', 'alert-danger')
                  setTimeout(()=>{
                    this.props.dismissMessage()
                  }, 3000)}
                } 
                className="btn btn-danger">You Blew It</button>
              </div>
              <div className="btn-group" role="group">
                <button
                onClick={() => this.props.dismissMessage()} 
                className="btn btn-danger">Dismiss</button>
              </div>
            </div>
          </div>

      </div>
    );
  }
}

const mapPropsToDispatch = (dispatch) => {  
  return bindActionCreators({sendFlashMessage, dismissMessage}, dispatch);
};


export default connect(null, mapPropsToDispatch)(UserAction);