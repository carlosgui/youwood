import React from 'react';
import PropTypes from 'prop-types';
import {Button, FormControl, InputGroup} from "react-bootstrap";

export const SearchBar = (props) => {
  const { searchTerm, onInputChange, doSearch } = props;

  return (
      <InputGroup className="mb-3" style={searchBarStyle.inputStyle}>
        <FormControl
          placeholder="Pesquisar"
          aria-label="Pesquisar"
          aria-describedby="basic-addon2"
          value={searchTerm}
          onChange={onInputChange}
        />
        <InputGroup.Append>
          <Button variant="primary" onClick={doSearch}>
            Buscar
          </Button>
        </InputGroup.Append>
      </InputGroup>
  )
};

const searchBarStyle = {
  inputStyle: {
    maxWidth: '80%'
  }
}

SearchBar.propTypes = {
  searchTerm: PropTypes.string,
  doSearch: PropTypes.func,
  onInputChange: PropTypes.func
};
