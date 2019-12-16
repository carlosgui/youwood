import { SEARCH_VIDEOS, SEARCH_VIDEOS_ERROR, SEARCH_VIDEOS_SUCCESS, SEARCH_MORE_VIDEOS } from './actionTypes';
import {YOUTUBE_API_KEY, YOUTUBE_SEARCH_URL} from "../resources/api";
const axios = require('axios');

/**
 * Here using axios to make a request to youtube api
 * we get a list of videos passing the TERM and PAGETOKEN
 * this list should come paginated
 * @param searchTerm
 * @param pageToken
 * @returns {Function}
 */
const getVideos = (searchTerm, pageToken, isLoadMore = false) => {
  return async dispatch => {

    if(isLoadMore) {
      dispatch({ type: SEARCH_MORE_VIDEOS });
    } else {
      dispatch({ type: SEARCH_VIDEOS });
    }

    try {
      const youtubeSearchParams = {
        key: YOUTUBE_API_KEY,
        maxResults: '15',
        part: 'snippet',
        q: searchTerm,
        order: 'relevance',
      };

      if(pageToken) {
        youtubeSearchParams.pageToken = pageToken;
      }

      const { data } = await axios.get(YOUTUBE_SEARCH_URL, { params: youtubeSearchParams });
      dispatch({ type: SEARCH_VIDEOS_SUCCESS, videos: data.items, nextPageToken: data.nextPageToken });

    } catch (e) {
      dispatch({ type: SEARCH_VIDEOS_ERROR });
    }
  }
};

export default {
  getVideos
}
