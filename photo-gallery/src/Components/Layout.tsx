import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  /* height: 100vh; */
  padding: 0px 300px;
  @media only screen and (max-width: 1400px) {
    padding: 0px 200px;
  }
  @media only screen and (max-width: 1000px) {
    padding: 0px 100px;
  }
  @media only screen and (max-width: 770px) {
    padding: 0px 30px;
  }
`;

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <StyledDiv>{children}</StyledDiv>
    </>
  );
};

export default Layout;
