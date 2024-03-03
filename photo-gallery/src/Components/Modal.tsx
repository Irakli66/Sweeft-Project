import React, { useState } from 'react';
import useSWR from 'swr';
import styled from 'styled-components';
import { getImageById } from '../api/unsplashApi';
import { AiOutlineLike } from 'react-icons/ai';
import { LuEye } from 'react-icons/lu';
import { IoCloudDownloadOutline } from 'react-icons/io5';

const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 1000;
`;
const StyledModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  /* padding-top: 20px; */
  /* gap: 10px; */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f4f4f2;
  z-index: 1000;
  border-radius: 5px;
  p {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    font-size: 18px;
    color: #495464;
    border: solid 1px #495464;
    border-radius: 5px;
    padding: 5px;
  }
`;
const StyledImg = styled.img`
  height: 80vh;
  @media only screen and (max-width: 1200px) {
    width: 100%;
    height: 100%;
  }
`;
const StyledButton = styled.button`
  border-bottom-right-radius: 5px;
  border-bottom-left-radius: 5px;
  background-color: #495464;
  color: white;
  border: none;
  height: 40px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const Modal = ({ setIsOpen, imgId }: any) => {
  const { isLoading, data, error } = useSWR(imgId, getImageById);

  if (error) return <h2>{error?.message}</h2>;

  return (
    <>
      <StyledModalOverlay onClick={() => setIsOpen(false)} />
      <StyledModalContainer>
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <p>
                <AiOutlineLike /> {data?.likes}
              </p>
              <p>
                <LuEye /> {data?.views}
              </p>
              <p>
                <IoCloudDownloadOutline />
                {data?.downloads}
              </p>
            </div>
            <StyledImg src={data?.urls?.regular} />
            <StyledButton onClick={() => setIsOpen(false)}>
              close
            </StyledButton>{' '}
          </>
        )}
      </StyledModalContainer>
    </>
  );
};

export default Modal;
