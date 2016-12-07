import {combineReducers} from 'redux';
import messageReducer from './message_reducer';

const rootReducer = combineReducers({  
  flashMessage: messageReducer
});

export default rootReducer;  