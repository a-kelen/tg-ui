import { combineReducers } from 'redux';
import channelReducer from './channelReducer';
import wordReducer from './wordReducer';


export default combineReducers({
  channels: channelReducer,
  words: wordReducer
});
