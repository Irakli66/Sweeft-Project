import React, { useState } from 'react';
import styled from 'styled-components';
import useSWRMutation from 'swr/mutation';
import { getImagesBySearchTerm } from '../api/unsplashApi';

const StyledContainer = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  /* justify-content: space-between; */
  gap: 20px;
  @media only screen and (max-width: 560px) {
    flex-direction: column;
  }
`;

const StyledSearchCont = styled.div`
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  gap: 5px;
  /* justify-content: space-between; */
  p {
    border: solid 1px #495464;
    border-radius: 5px;
    padding: 5px;
    &:hover {
      cursor: pointer;
      background-color: #495464;
      color: #f4f4f2;
    }
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  /* padding: 10px; */
  column-gap: 10px;
  row-gap: 10px;
  @media only screen and (max-width: 1200px) {
    grid-template-columns: auto auto auto;
  }
  @media only screen and (max-width: 770px) {
    grid-template-columns: auto auto;
  }

  @media only screen and (max-width: 560px) {
    grid-template-columns: auto;
    width: 100%;
  }
`;
const StyledGridItem = styled.div`
  font-size: 30px;
  @media only screen and (max-width: 560px) {
    width: 100%;
  }
`;

const StyledImg = styled.img`
  width: 100%;
  height: 200px;
  justify-self: center;
  align-self: center;
  border-radius: 10px;
  /* transition: transform 0.5s; */
`;
const StyledButton = styled.button`
  border: none;
  background-color: #495464;
  color: #f4f4f2;
  padding: 5px;
  border-radius: 5px;
  font-size: 16px;
  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
`;
const History = () => {
  const searchHistory = JSON.parse(
    localStorage.getItem('searchHistory') as string
  );

  const [seartState, setSearchState] = useState('');

  const { trigger, data, error } = useSWRMutation(
    seartState,
    getImagesBySearchTerm
  );

  if (error) return <h2>{error.message}</h2>;

  return (
    <StyledContainer>
      {searchHistory?.length > 0 && (
        <div>
          <StyledButton
            onClick={async () => {
              await localStorage.clear();
              window.location.reload();
            }}
          >
            Clear History
          </StyledButton>
        </div>
      )}

      <StyledSearchCont>
        {searchHistory?.map((data: string) => {
          return (
            <p
              key={data}
              onClick={async () => {
                await setSearchState(data);
                trigger();
              }}
            >
              {data}
            </p>
          );
        })}
      </StyledSearchCont>
      <StyledGridContainer>
        {data?.length > 0 ? (
          data?.map((item: any) => {
            return (
              <StyledGridItem key={item.id}>
                <StyledImg src={item.urls.thumb} alt={item.alt_description} />
              </StyledGridItem>
            );
          })
        ) : (
          <h2>Empty...</h2>
        )}
      </StyledGridContainer>
    </StyledContainer>
  );
};

export default History;
