const BASE_URL = 'http://localhost:3001/note';
import $ from 'jquery';

export function saveNote(title, content, plaintext, auther){
  return $.ajax({
    url:`${BASE_URL}`,
    data:{title: title,
          content: content,
          plaintext: plaintext,
          author: auther},
    type:'POST'})
}

export function updateNote (id, title, content, plaintext){
  return $.ajax({
    url:`${BASE_URL}/${id}`,
    data:{title: title,
          content: content,
          plaintext: plaintext
        },
    type:'PUT'})
}

export function deleteNote(id){
  return $.ajax({
    url:`${BASE_URL}/${id}`,
    type:'DELETE',
    datatype: 'json'
    })
}