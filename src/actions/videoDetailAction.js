import {OPEN_VIDEO_DETAILS, OPEN_VIDEO_DETAILS_ERROR, OPEN_VIDEO_DETAILS_SUCCESS,} from "./actionTypes";
import {YOUTUBE_API_KEY, YOUTUBE_VIDEO_DETAILS_URL} from "../resources/api";
const axios = require('axios');

const getVideosDetails = videoId => {
  return async dispatch => {
    dispatch({ type: OPEN_VIDEO_DETAILS });
    try {
      const videoDetailParams = {
        part: 'snippet',
        key: YOUTUBE_API_KEY
      };

      if(videoId) {
        videoDetailParams.id = videoId;
      }

      const { data } = await axios.get(
        YOUTUBE_VIDEO_DETAILS_URL, {
          params: videoDetailParams
        }
      );
      dispatch({ type: OPEN_VIDEO_DETAILS_SUCCESS, video: data.items[0] });
    } catch (e) {
      dispatch({ type: OPEN_VIDEO_DETAILS_ERROR });
    }
  }
};

export default {
  getVideosDetails
}
