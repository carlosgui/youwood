import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import actions from '../../actions'
import {SearchBar, VideoList} from "../../components";
import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: '',
      formNotValid: false
    };

    this.doSearch = this.doSearch.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
  }

  onInputChange(event) {
    this.setState( { searchTerm: event.target.value })
  }

  doSearch() {
    const {searchTerm} = this.state;
    if (searchTerm !== '') {
      this.props.dispatch(actions.getVideos(searchTerm));
    }
  }

  render() {
    const { searchTerm } = this.state;
    const { videoResult } = this.props;

    return (
      <div className="col-12 home">
        <SearchBar searchTerm={searchTerm} doSearch={this.doSearch} onInputChange={this.onInputChange} />
        <VideoList videoResult={videoResult}/>
      </div>
    );
  }
}

Home.propTypes = {
  dispatch: PropTypes.func,
  videoResult: PropTypes.array
};

const mapDispatchToProps = dispatch => {
  return {
    dispatch,
  };
};

const mapStateToProps = store => ({
  videoResult: store.youtubeSearch.videoResult
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
