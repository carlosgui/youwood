import React from 'react';
import PropTypes from "prop-types";
import { makeStyles } from '@material-ui/core/styles';
import {
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Card } from '@material-ui/core';

export const VideoCard = props => {
  const classes = useStyles();
  const { content } = props;
  const { videoImage, channelTitle, videoTitle, videoDescription } = getContentInfo(content);

  return (
    <Card className={classes.card} style={videoCardStyle.cardStyle}>
      <CardActionArea>
        <CardMedia className={classes.media}
          image={videoImage}
          title="channelTitle"
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="h6" align="left">
            {videoTitle}
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
  )
};

const getContentInfo = video => {
  return {
    videoImage: video.snippet.thumbnails.high.url,
    channelTitle: video.snippet.channelTitle,
    videoTitle: video.snippet.title,
    videoDescription: video.snippet.description
  }
};

VideoCard.propTypes = {
  content: PropTypes.object
};

const videoCardStyle = {
  cardStyle: {
    flexGrow: 2
  }
}

const useStyles = makeStyles({
  card: {
    margin: 16,
    maxWidth: 350
  },
  media: {
    height: 140,
  },
});
