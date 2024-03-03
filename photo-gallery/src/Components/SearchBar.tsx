import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  border: none;
  width: 50%;
  margin-top: 20px;
  border-radius: 5px;
  border: #495464 1px solid;
  height: 30px;
  padding: 5px 10px;
  font-size: 16px;
  background: url('https://static.thenounproject.com/png/101791-200.png')
    no-repeat right;
  background-size: 20px;
  @media only screen and (max-width: 1200px) {
    width: 100%;
  }

  &:focus {
    outline: none;
  }
`;
const SearchBar = ({ searchValue, setSearchValue }: any) => {
  return (
    <div>
      <StyledInput
        type="text"
        placeholder="Type something to search..."
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
        }}
      />
    </div>
  );
};

export default SearchBar;
