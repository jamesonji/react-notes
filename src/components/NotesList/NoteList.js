import React from 'react';

function NoteList (props) {
  
  const forwardNote = function (id, content, title) {
    return function (event) {
      props.onClick(id, content, title)
    }
  }
  
  return (
    <ul className='NoteList'>
      {
        props.notes.map(
          function (note, index) {
            return (
              <li
                onClick={forwardNote(note._id, note.content, note.title)}
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
