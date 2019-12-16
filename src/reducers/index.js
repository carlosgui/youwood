import { youtubeSearchReducer } from './youtubeSearchReducer';
import { combineReducers } from 'redux';
import {videoDetailReducer} from "./videoDetailReducer";

export const Reducers = combineReducers({
  youtubeSearch: youtubeSearchReducer,
  videoDetail: videoDetailReducer
});
