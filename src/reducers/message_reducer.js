import {FLASH_MESSAGE} from '../actions/index';

const initialState = {  
  message: null,
  className: null
}

export default function messageReducer (state = initialState, action) {  
  switch(action.type){
    case FLASH_MESSAGE:
      return action.payload;
    default:
      return state;
  }
};
