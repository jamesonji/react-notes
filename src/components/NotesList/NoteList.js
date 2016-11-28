import React from 'react';
import { Link } from 'react-router';

function NoteList (props) {
  
  const forwardNote = function (id, title) {
    return function (event) {
      props.onClick(id, title)
    }
  }
  
  return (
    <ul className='NoteList'>
      {
        props.notes.map(
          function (note, index) {
            return (
              <li
                onClick={forwardNote(note._id, note.title)}
                key={note._id}>
                {note.title}
               </li>
              // <li key={note._id}>
              //   <Link to='/'> {note.title} </Link>
              // </li>
            )
          }
        )
      }
    </ul>
  )
}

NoteList.defaultProps = {
  notes: [],
  onClick: function () {}
}

export default NoteList;
