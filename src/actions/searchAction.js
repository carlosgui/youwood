import { SEARCH_VIDEOS, SEARCH_VIDEOS_ERROR, SEARCH_VIDEOS_SUCCESS } from './actionTypes';
import { YOUTUBE_API_KEY } from "../resources/api";
import YTSearch from 'youtube-api-search';

const getVideos = searchTerm => {
  return async dispatch => {
    dispatch({ type: SEARCH_VIDEOS });
    try {
      await YTSearch({
        key: YOUTUBE_API_KEY,
        term: searchTerm,
      }, (videos) => dispatch({ type: SEARCH_VIDEOS_SUCCESS, videos }));
    } catch (e) {
      dispatch({ type: SEARCH_VIDEOS_ERROR})
    }
  }
};

export default {
  getVideos
}
