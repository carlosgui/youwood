import {OPEN_VIDEO_DETAILS, OPEN_VIDEO_DETAILS_ERROR, OPEN_VIDEO_DETAILS_SUCCESS} from "../actions/actionTypes";

const initialState = {
  video: {},
  loading: false
};

export const videoDetailReducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_VIDEO_DETAILS:
      return {
        ...state,
        loading: true
      };

    case OPEN_VIDEO_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        video: action.video
      };

    case OPEN_VIDEO_DETAILS_ERROR:
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
};
