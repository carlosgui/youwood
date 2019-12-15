import { SEARCH_VIDEOS, SEARCH_VIDEOS_ERROR, SEARCH_VIDEOS_SUCCESS } from './actionTypes';
import { YOUTUBE_API_KEY } from "../resources/api";
const axios = require('axios');

const getVideos = (searchTerm, pageToken) => {
  return async dispatch => {
    dispatch({ type: SEARCH_VIDEOS });
    try {
      // await YTSearch({
      //   key: YOUTUBE_API_KEY,
      //   term: searchTerm,
      // }, (videos) => dispatch({ type: SEARCH_VIDEOS_SUCCESS, videos }));

      const youtubeSearchParams = {
        key: YOUTUBE_API_KEY,
        maxResults: '10',
        part: 'snippet',
        q: searchTerm,
        order: 'relevance',
      };

      if(pageToken) {
        youtubeSearchParams.pageToken = pageToken;
      }

      const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', { params: youtubeSearchParams });

      console.log(data.items);
      dispatch({ type: SEARCH_VIDEOS_SUCCESS, videos: data.items, nextPageToken: data.nextPageToken });


    } catch (e) {
      dispatch({ type: SEARCH_VIDEOS_ERROR})
    }
  }
};

export default {
  getVideos
}
