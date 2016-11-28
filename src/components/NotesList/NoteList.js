import React from 'react';

function NoteList (props) {
  
  const forwardNote = function (title) {
    return function (event) {
      props.onClick(title)
    }
  }
  
  return (
    <ul className='NoteList'>
      {
        props.notes.map(
          function (note, index) {
            return (
              <li
                onClick={forwardNote(note.title)}
                key={note._id}>
                {note.title}
              </li>
              )
          }
        )
      }
    </ul>
  )
}

NoteList.defaultProps = {
  notes: [],
  // to prevent a crash if the QuestionList component is
  // called without an onClick prop with set a default empty function to it
  onClick: function () {}
}

// We can export any variable
export default NoteList;
