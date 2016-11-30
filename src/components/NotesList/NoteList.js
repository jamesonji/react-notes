import React from 'react';

const NoteList = function (props) {
  
  const forwardNote = function (id, content, title) {
    return function (event) {
      props.onClick(id, content, title)
    }
  }
  
  return (
    <ul>
      {
        props.notes.map(
          function (note, index) {
            return (
              <li className="List-Item"
                onClick={forwardNote(note._id, note.content, note.title)}
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
