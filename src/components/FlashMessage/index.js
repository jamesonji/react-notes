import React, {Component} from 'react';  
import {connect} from 'react-redux';

class FlashMessage extends Component{

  render(){
    const {message, className} = this.props.flashMessage;
    if(!message){
      return null;
    }

    return (
      <div className="row">
        <div 
        className={'mw8 bg-red pink' + className} 
        role="alert">
          {message}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({flashMessage}) => {  
  return {flashMessage};
};

export default connect(mapStateToProps)(FlashMessage);  