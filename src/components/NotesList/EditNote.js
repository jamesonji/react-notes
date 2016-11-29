import React, {Component} from 'react';
import MyEditor from '../editor/Editor.js';

export default class EditNote extends Component {
  constructor(props){
    super(props)
    this.state = { 
      note_id: '',
      title: '',
      note: '',
    }
    this.initNote = this.initNote.bind(this);
  }
  
  initNote(){
    this.setState({       
          note_id: this.props.note_id,
          title: this.props.title,
          note: this.props.note,
        })
  }
  
  componentDidMount(){
    this.initNote();
  }
  
  render() {
    return (
      <div className="Edite-Note">  
        <button onClick={ this.props.onBackClick }> Back </button>
        <MyEditor 
          note_id={ this.state.note_id }
          title={this.state.title}
          note={ this.state.note }
         />
      </div>
    )
  }
} 