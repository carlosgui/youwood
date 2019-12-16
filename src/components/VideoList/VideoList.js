import React from 'react';
import PropTypes from "prop-types";
import {VideoCard} from "..";

/**
 * This is a simple stateless component that should render
 * an list of video card and just that!
 * @param props
 * @returns {*}
 * @constructor
 */
export const VideoList = props => {
  const { videoResult } = props;

  if(videoResult) {
    return (
      <div style={listStyle.flexList}>
        {videoResult.map((video, key) => <VideoCard content={video} key={key} />)}
      </div>
    );
  } else {
    return <div>Here</div>
  }
};

/**
 * page css
 */
const listStyle = {
  flexList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

/**
 * page proprieties
 */
VideoList.propTypes = {
  videoResult: PropTypes.array,
  videoDetails: PropTypes.func,
};

