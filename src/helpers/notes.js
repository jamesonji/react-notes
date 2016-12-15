import {BASE_URL} from '../config/constants'
import $ from 'jquery';

export function saveNote(title, content, plaintext, auther){
  return $.ajax({
    url:`${BASE_URL}/note`,
    data:{title: title,
          content: content,
          plaintext: plaintext,
          author: auther},
    type:'POST'})
}

export function updateNote (id, title, content, plaintext){
  console.log(`${BASE_URL}`);
  return $.ajax({
    url:`${BASE_URL}/note/${id}`,
    data:{title: title,
          content: content,
          plaintext: plaintext
        },
    type:'PUT'})
}

export function deleteNote(id){
  return $.ajax({
    url:`${BASE_URL}/note/${id}`,
    type:'DELETE',
    datatype: 'json'
    })
}