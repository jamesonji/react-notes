import React, {Component} from 'react';
import MyEditor from '../editor/Editor.js';

export default class EditNote extends Component {
  constructor(props){
    super(props)
    this.state = { 
      note: this.props.note,
      note_id: this.props.note_id
    }
    this.initNote = this.initNote.bind(this);
  }
  
  initNote(){
    this.setState({ note: this.props.note })
    console.log(this.props.note);
  }
  
  componentDidMount(){
    console.log(this.props.note);
    this.setState({
      note: this.props.note,
    })
  }
  
  render() {
    return (
      <div className="Edite-Note">  
        <button onClick={ this.props.onBackClick }> Back </button>
        <MyEditor 
          note={ this.state.note }
          note_id={ this.state.note_id }
         />
      </div>
    )
  }
} 