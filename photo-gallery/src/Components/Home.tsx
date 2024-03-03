import { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import useSWR from 'swr';
import { getImagesResult, getImagesBySearchTerm } from '../api/unsplashApi';

const StyledWrapper = styled.div`
  /* position: relative; */
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media only screen and (max-width: 560px) {
    justify-content: center;
    align-items: center;
    grid-template-columns: auto;
  }
`;

const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  /* padding: 10px; */
  column-gap: 20px;
  row-gap: 20px;
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
  transition: transform 0.5s;

  &:hover {
    cursor: pointer;
    transform: scale(1.05);
  }
`;

// type homePropsType = {
//   searchTerm: string;
//   setImgId: string;
//   setIsOpen: boolean;
// };

const Home = ({ searchTerm, setImgId, setIsOpen }: any) => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [images, setImages] = useState<Array<any>>();
  const [search, setSearch] = useState<boolean>(false);

  const { isLoading, data, error } = useSWR(
    searchTerm ? searchTerm : pageNumber,
    searchTerm ? getImagesBySearchTerm : getImagesResult
  );

  useEffect(() => {
    if (!images || searchTerm) {
      if (searchTerm) {
        setSearch(true);
      }
      setImages(data);
    } else if (data) {
      if (!searchTerm) images.push(...data);
    } else if (searchTerm === '' && search) {
      setSearch(false);
      setImages(data);
    }
  }, [data]);

  const observer: any = useRef();
  const lastImageRef = useCallback(
    (node: any) => {
      if (isLoading) return;
      if (observer?.current) {
        observer.current.disconnect();
      }
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer?.current?.observe(node);
    },
    [isLoading]
  );

  if (error) {
    return <h2>{error.message}</h2>;
  }
  return (
    <>
      <StyledWrapper>
        <StyledGridContainer>
          {images
            ? images?.map((item: any, index: number) => {
                if (images?.length === index + 1) {
                  return (
                    <StyledGridItem key={item?.id} ref={lastImageRef}>
                      <StyledImg
                        src={item?.urls?.thumb}
                        alt={item?.alt_description}
                        onClick={() => {
                          setIsOpen(true);
                          setImgId(item.id);
                        }}
                      />
                    </StyledGridItem>
                  );
                } else {
                  return (
                    <StyledGridItem key={item.id}>
                      <StyledImg
                        src={item?.urls?.thumb}
                        alt={item?.alt_description}
                        onClick={() => {
                          setIsOpen(true);
                          setImgId(item.id);
                        }}
                      />
                    </StyledGridItem>
                  );
                }
              })
            : ''}
        </StyledGridContainer>
      </StyledWrapper>
    </>
  );
};

export default Home;
