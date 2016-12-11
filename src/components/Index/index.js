import React, { Component } from 'react';
import MyEditor from '../editor/Editor';
import LandingPage from '../LandingPage';
import $ from 'jquery';
import './style.css'

const BASE_URL = 'http://localhost:3001';

class Index extends Component {
  constructor (props){
    super(props)
    this.state={
      authed: false,
      text: "Please enter your notes",
    }
    this.initNote = this.initNote.bind(this);
  }
  
  initNote(){
    $.ajax({
      url:`${BASE_URL}`,
      type:"GET",
      success: function (data){
        console.log(data)
        this.setState({text: data.text})
      }.bind(this)
    })
  }
  
  componentWillReceiveProps(props){
    this.setState({
      authed: props.authed,
    })
  }
  
  componentDidMount(){
    this.setState({
      authed: this.props.authed,
    })
    this.initNote();
  }
  
  render() {
    return (
      <div className="Home-page">
        {this.state.authed?
          <div className="">
            <MyEditor editView={false}
                      editable={true}/>
          </div>    
          :
          <LandingPage />
        }
      </div>
    );
  }
}

export default Index;
