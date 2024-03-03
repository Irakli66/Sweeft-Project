import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  background-color: #495464;
  height: 60px;
`;

const StyledAtag = styled.a`
  display: flex;
  padding: 5px;
  border-radius: 0.4rem;
  letter-spacing: 0.15rem;
  background-color: #f4f4f2;
  color: #495464;
  font-weight: 600;
  &:hover {
    margin-bottom: 0.1rem;
  }
`;

const Header = () => {
  return (
    <StyledNav>
      <StyledAtag href="/">Home</StyledAtag>
      <StyledAtag href="/history">History</StyledAtag>
    </StyledNav>
  );
};

export default Header;
