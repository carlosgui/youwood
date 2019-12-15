import { youtubeSearchReducer } from './youtubeSearchReducer';
import { combineReducers } from 'redux';

export const Reducers = combineReducers({
  youtubeSearch: youtubeSearchReducer,
});
