import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions'
import InfiniteScroll from 'react-infinite-scroller';
import {SearchBar, VideoList, Loading, Header} from "../components";
import history from '../config/history';

/**
 * Home container this is the mainly page of the app
 * this page contains the video search and video list
 * this page are connected with redux and the application storage
 */
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      inputCheck: false,
      firstSearch: false
    };

    this.doSearch = this.doSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  componentDidMount() {
    const { search } = this.props.match.params;
    if(search) {
      history.push(`${search}`);
      this.props.dispatch(actions.getVideos(search));
    }
  }

  onInputChange(event) {
    this.setState( { searchTerm: event.target.value })
  }

  /**
   * Search on enter and on button click
   * do the search when not loading and the search term is not empty
   */
  doSearch() {
    const { searchTerm } = this.state;
    if (searchTerm === '') {
      this.setState({ inputCheck: true });
      return;
    }

    this.setState({ inputCheck: false, firstSearch: true });
    history.push(`${searchTerm}`);
    this.props.dispatch(actions.getVideos(searchTerm));
  }

  /**
   * Load more function called by infinity scroll
   * this function only operates after a first normal search
   */
  loadMore() {
    const { searchTerm, firstSearch } = this.state;
    const { nextPageToken, loading } = this.props;

    if(firstSearch && !loading) {
      this.props.dispatch(actions.getVideos(searchTerm, nextPageToken, true));
    }
  }

  /**
   * After user press enter should do the search
   * @param event
   */
  onKeyPress(event) {
    if(event.key === 'Enter') {
      this.doSearch();
    }
  }

  /**
   * This render contains all the components from the home page
   * SearchBar | InfiniteScroll | VideoList | Loading
   * @returns a render page
   */
  render() {
    const { searchTerm, inputCheck } = this.state;
    const { videoResult, loading } = this.props;

    return (
      <div>
        <Header />
        <div className="col-12" style={homeStyle.home}>
          <SearchBar searchTerm={searchTerm}
                     doSearch={this.doSearch}
                     onInputChange={this.onInputChange}
                     onKeyPress={this.onKeyPress}
                     inputCheck={inputCheck} />

          <InfiniteScroll
            pageStart={0}
            loadMore={this.loadMore}
            hasMore={true}
          >
            <VideoList videoResult={videoResult}/>
          </InfiniteScroll>
          <Loading loading={loading} />
        </div>
      </div>

    );
  }
}

/**
 * Proprieties needed for this page
 * @type {{
 * dispatch: function,
 * nextPageToken: string,
 * videoResult: array,
 * loading: boolean}}
 */
Home.propTypes = {
  dispatch: PropTypes.func,
  videoResult: PropTypes.array,
  nextPageToken: PropTypes.string,
  loading: PropTypes.bool
};

/**
 * Here we have all the css need fro the page
 */
const homeStyle = {
  home: {
    display: 'flex',
    textAlign: 'center',
    minHeight: '100vh',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    paddingTop: '70px',
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
  videoResult: store.youtubeSearch.videoResult,
  nextPageToken: store.youtubeSearch.nextPageToken,
  loading: store.youtubeSearch.loading
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
