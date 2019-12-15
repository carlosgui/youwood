import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, InputGroup} from "react-bootstrap";

export const SearchBar = (props) => {
  const { searchTerm, onInputChange, doSearch, inputCheck, onKeyPress } = props;

  return (
    <div style={searchBarStyle.container}>
      <InputGroup>
        <FormControl
          placeholder="Pesquisar"
          aria-label="Pesquisar"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={onInputChange}
          onKeyPress={onKeyPress}
          isInvalid={inputCheck}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={doSearch}>
            Buscar
          </Button>
        </InputGroup.Append>
      </InputGroup>
      <div style={inputCheck ? searchBarStyle.showErrorText : searchBarStyle.hidErrorText}>
        <label>Digite algo para buscar!</label>
      </div>
    </div>
  )
};

const searchBarStyle = {
  container: {
    maxWidth: '78vw',
    minWidth: '78vw'
  },
  showErrorText: {
    fontSize: '12pt',
    display: 'block',
    color: 'red',
    textAlign: 'left'
  },
  hidErrorText: {
    display: 'none',
  }
};

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  doSearch: PropTypes.func,
  onInputChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  inputCheck: PropTypes.bool
};
