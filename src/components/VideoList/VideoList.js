import React from 'react';
import PropTypes from "prop-types";
import {VideoCard} from "..";

export const VideoList = props => {
  const { videoResult } = props;
  return (
    <div style={listStyle.flexList}>
      {videoResult.map(video => <VideoCard content={video} />)}
    </div>
  );
};

const listStyle = {
  flexList: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  }
};

VideoList.propTypes = {
  videoResult: PropTypes.array,
  videoDetails: PropTypes.func,
};

