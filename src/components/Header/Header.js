import React from "react";
import logo from "../../assets/logo.png";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

export const Header = ({searchTerm}) => {
  if(!searchTerm) {
    searchTerm = '';
  }
  return (
      <Link to={`/${searchTerm}`}  style={headerStyle.header}>
        <div>
          <img style={headerStyle.logo} src={logo} alt='logo' />
        </div>
        <div style={headerStyle.projectName}>
          <h3>YouWood</h3>
        </div>
      </Link>
  )
};

const headerStyle = {
  header: {
    position: 'fixed',
    zIndex: 999,
    top: 0,
    width: '100vw',
    background: 'black',
    color: 'white',
    display: 'flex',
    padding: '10px',
    textDecoration: 'none'
  },
  logo: {
    width: '45px'
  },
  projectName: {
    paddingLeft: '20px'
  }
};

Header.propTypes = {
  searchTerm: PropTypes.string
};
