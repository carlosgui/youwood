import {SEARCH_VIDEOS, SEARCH_VIDEOS_SUCCESS,SEARCH_VIDEOS_ERROR} from '../actions/actionTypes';

const initialState = {
  videoResult: [],
  nextPageToken: '',
  loading: false,
};

/**
 * This reducer should contain and control all data information about our video search
 * @param state
 * @param action
 */
export const youtubeSearchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_VIDEOS:
      return {
        ...state,
        loading: true
      };

    case SEARCH_VIDEOS_SUCCESS:
      return {
        ...state,
        loading: false,
        videoResult: state.videoResult.concat(action.videos),
        nextPageToken: action.nextPageToken
      };

    case SEARCH_VIDEOS_ERROR:
      return {
        ...state,
        loading: false,
        videoResult: []
      };

    default:
      return state;
  }
};
