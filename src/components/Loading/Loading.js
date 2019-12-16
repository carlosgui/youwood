import React from "react";
import PropTypes from 'prop-types';
import logo from "../../assets/loaders/loader.gif";

/**
 * This is a simple stateless component that should render
 * it`s a simple loading gif with a loading text
 * @param props
 * @returns {*}
 * @constructor
 */
export const Loading = ({loading}) => {
  if(!loading) {
    return <></>
  }

  return (
    <div>
      <img style={loadingStyle.loader} src={logo} alt="loading..." />
      <br />
      <label style={loadingStyle.label}>Carregando</label>
    </div>
  );
};

/**
 * page proprieties
 */
Loading.propTypes = {
  loading: PropTypes.bool
};

/**
 * page css
 */
const loadingStyle = {
  loader: {
    maxWidth: '80px'
  },
  label: {
    fontSize: '12pt'
  }
};

