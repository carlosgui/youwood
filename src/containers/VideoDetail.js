import React, {Component} from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { IoIosArrowDropleft, IoIosThumbsDown, IoIosThumbsUp, IoIosEye} from 'react-icons/io';
import { Link } from 'react-router-dom';
import actions from '../actions';
import {Header} from "../components";
import {YOUTUBE_EMBED_URL} from "../resources/api";

/***
 * Video details page this page handles video view and channel page
 * this component has redux connection
 */
class VideoDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.formatVideoInfo = this.formatVideoInfo.bind(this);
  }

  /***
   * Get url params to do the search when enter on page
   */
  componentDidMount() {
    const { videoId, search } = this.props.match.params;
    this.setState({ videoId, searchTerm: search });
    this.props.dispatch(actions.getVideosDetails(videoId));
  }

  render() {
    const { searchTerm } = this.state;

    if(!this.props.video) {
      return <div>
        <Header searchTerm={searchTerm}/>
        <div style={videoStyle.channelPage}>
          <div>
            <h5> Em breve pagina de perfil desde canal! </h5>
          </div>
          <div>
            <label>Estamos trabalhando duro para que isso esteja pronto o quanto antes!</label>
          </div>
          <div>
            <Link to={`/${searchTerm}`}>Voltar para a busca</Link>
          </div>
        </div>
      </div>
    }

    const videoInformation = this.formatVideoInfo();
    return (
      <div>
        <Header searchTerm={searchTerm}/>
        <div className="container" style={videoStyle.container}>
          <div className="video-detail col-12">
            <div style={videoStyle.titleContainer}>
              <div>
                <Link to={`/${searchTerm}`}>
                  <IoIosArrowDropleft size={25}/>
                </Link>
              </div>
              <div style={videoStyle.videoTitle}>
                <h4>{videoInformation?.title}</h4>
              </div>
            </div>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe className="embed-responsive-item"
                      src={this.getVideoUrl(this.state.videoId)}
                      title='video' />
            </div>
            <div style={videoStyle.videoInfoContainer}>
              <div>
                <label>{videoInformation?.channel}</label>
              </div>
              <div style={videoStyle.likeDislike}>
                <div style={videoStyle.like}>
                  <label><IoIosThumbsUp size={20}/> {videoInformation?.likes}</label>
                </div>
                <div>
                  <label><IoIosThumbsDown size={20}/> {videoInformation?.unlikes}</label>
                </div>
              </div>
            </div>
            <div>
              <p>{videoInformation?.description}</p>
            </div>

            <div>
              <label><IoIosEye size={20}/> {videoInformation?.views}</label>
            </div>
          </div>
        </div>
      </div>
      );
  }

  /***
   * Just mount the video URL using videoId
   * @param videoId
   * @returns {string}
   */
  getVideoUrl = (videoId) => `${YOUTUBE_EMBED_URL}${videoId}`;

  /**
   * format video information to use at the main render
   * @returns {{unlikes: number, channel: *, description: *, videoId: *, title: *, views: number, likes: number}}
   */
  formatVideoInfo() {
    const { video } = this.props;
    if(video && video.snippet) {
      return {
        title: video.snippet.title,
        videoId: video.id,
        channel: video.snippet.channelTitle,
        likes: video.statistics.likeCount | 0,
        unlikes: video.statistics.dislikeCount | 0,
        description: video.snippet.description,
        views: video.statistics.viewCount | 0
      }
    }
  }
}

/**
 * Proprieties needed for this page
 * @type {{
 * dispatch: function,
 * video: object,
 * loading: boolean}}
 */
VideoDetail.propTypes = {
  dispatch: PropTypes.func,
  video: PropTypes.object,
  loading: PropTypes.bool,
  match: PropTypes.object,
  searchTerm: PropTypes.string
};

/**
 * Here we have all the css need fro the page
 */
const videoStyle = {
  titleContainer: {
    display: 'flex',
    paddingTop: '30px'
  },
  container: {
    paddingTop: '60px'
  },
  videoInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: '15px',
    marginBottom: '15px'
  },
  likeDislike: {
    display: 'flex'
  },
  like: {
    marginRight: '24px'
  },
  videoTitle: {
    paddingLeft: '20px'
  },
  channelPage: {
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'column',
    paddingTop: '20%'
  }
};

/**
 * Our dispatch propriety
 * @param dispatch
 * @returns {{dispatch: *}}
 */
const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

/**
 * Getting results from our storage after the dispatch being called
 * @param store
 * @returns {{nextPageToken: *, videoResult: *, loading: *}}
 */
const mapStateToProps = store => ({
  video: store.videoDetail.video,
  loading: store.videoDetail.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(VideoDetail);
