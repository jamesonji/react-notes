import React, {Component} from 'react';
import MyEditor from '../editor/Editor.js';

export default class EditNote extends Component {
  constructor(props){
    super(props)
    this.state = { 
      text: this.props.note
    }
    this.initNote = this.initNote.bind(this);
  }
  
  initNote(){
    this.setState({text: this.props.note})
    console.log(this.props.note);
  }
  
  componentDidMount(){
    console.log(this.props.note);
    this.setState({
      text: this.props.note,
    })
  }
  
  render() {
    return (
      <div className="Edite-Note">  
        <button onClick={this.props.onBackClick}>Back</button>
        <MyEditor note={ this.state.text }/>
      </div>
    )
  }
} 