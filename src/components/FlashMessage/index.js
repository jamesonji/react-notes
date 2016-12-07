import React, {Component} from 'react';  
import {connect} from 'react-redux';
import './style.css'
class FlashMessage extends Component{

  render(){
    const {message, className} = this.props.flashMessage;
    
    if(!message){
      return null;
    }

    return (
      <div className="row">
        <div 
        className={'center h2 w-100 ' + className} 
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