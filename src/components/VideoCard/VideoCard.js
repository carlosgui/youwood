import React from 'react';
import PropTypes from "prop-types";
import {
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Card } from '@material-ui/core';

import { Link } from 'react-router-dom';

/**
 * This is a simple stateless component that should render
 * and card with some youtube video informations
 * @param props
 * @returns {*}
 * @constructor
 */
export const VideoCard = props => {
  const { content, searchTerm } = props;
  const { videoImage, channelTitle, videoTitle, videoDescription, videoId } = getContentInfo(content);

  return (
    <Link to={`/details/${videoId}/${searchTerm}`}>
      <Card style={videoCardStyle.cardStyle}>
        <CardActionArea>
          <CardMedia style={videoCardStyle.media}
            image={videoImage}
            title="channelTitle"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="h6" align="left">
              {videoTitle.substr(0,40)}
            </Typography>
            <Typography variant="body2" color="textSecondary" align="left">
              {channelTitle}
            </Typography>
            <hr />
            <Typography variant="body2" color="textSecondary" component="p" align="left">
              {videoDescription}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  )
};

/**
 * Here we just get the video information to not pollute the code
 * @param video
 * @returns {{videoDescription: *, videoImage: *, videoTitle: *, channelTitle: *}}
 */
const getContentInfo = video => {
  return {
    videoImage: video.snippet.thumbnails.high.url,
    channelTitle: video.snippet.channelTitle,
    videoTitle: video.snippet.title,
    videoDescription: video.snippet.description,
    videoId: video.id.videoId
  }
};

/**
 * page proprieties
 */
VideoCard.propTypes = {
  content: PropTypes.object,
  searchTerm: PropTypes.string
};

/**
 * page css
 */
const videoCardStyle = {
  cardStyle: {
    flexGrow: 2,
    margin: 16,
    width: 320,
    height: 375,
  },
  media: {
    height: 140,
  }
};
