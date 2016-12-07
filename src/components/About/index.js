import React, { Component } from 'react';
import { firebaseAuth } from '../../config/constants';

import './style.css';

export default class About extends Component {
  constructor(){
    super();
    this.state=({
      email: '',
    })
  }
  
  componentDidMount(){
    const user = firebaseAuth().currentUser;
    if (user) {
      console.log(user);
      this.setState=({
        email: user.email,
      })
    } else {
      console.log('Not logged in')
    }
  }
  
  render() {
    return (
      <div className="About-page">
        <h1>
          About
        </h1>
      </div>
    );
  }
}