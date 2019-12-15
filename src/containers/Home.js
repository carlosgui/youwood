import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../actions'
import {SearchBar, VideoList} from "../components";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      inputCheck: false
    };

    this.doSearch = this.doSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  onInputChange(event) {
    this.setState( { searchTerm: event.target.value })
  }

  doSearch() {
    const {searchTerm} = this.state;
    const { videoResult } = this.props;

    if (searchTerm !== '') {
      this.setState({ inputCheck: false });
      this.props.dispatch(actions.getVideos(searchTerm, videoResult.length));
    } else {
      this.setState({ inputCheck: true })
    }
  }

  onKeyPress(event) {
    if(event.key === 'Enter') {
      this.doSearch();
    }
  }

  render() {
    const { searchTerm, inputCheck } = this.state;
    const { videoResult } = this.props;

    return (
      <div className="col-12" style={homeStyle.home}>
        <SearchBar searchTerm={searchTerm}
                   doSearch={this.doSearch}
                   onInputChange={this.onInputChange}
                   onKeyPress={this.onKeyPress}
                   inputCheck={inputCheck} />

        <VideoList videoResult={videoResult}/>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  videoResult: PropTypes.array
};

const homeStyle = {
  home: {
    display: 'flex',
    textAlign: 'center',
    backgroundColor: '#282c34',
    minHeight: '100vh',
    minWidth: '90vw',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    fontSize: 'calc(10px + 2vmin)',
    color: 'white'
  }
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const mapStateToProps = store => ({
  videoResult: store.youtubeSearch.videoResult,
  nextPageToken: store.youtubeSearch.nextPageToken
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
