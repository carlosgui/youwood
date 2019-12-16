import React from "react";
import logo from "../../assets/logo.png";

export const Header = () => {
  return (
    <div style={headerStyle.header}>
      <div>
        <img style={headerStyle.logo} src={logo} alt='logo' />
      </div>
      <div style={headerStyle.projectName}>
        <h3>YouWood</h3>
      </div>
      <div></div>
    </div>
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
  },
  logo: {
    width: '45px'
  },
  projectName: {
    paddingLeft: '20px'
  }
};

