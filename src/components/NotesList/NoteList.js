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
  onClick: function () {}
}

export default NoteList;
