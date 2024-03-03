import axios from 'axios';

const unsplashApi = axios.create();
const accessKey: string = process.env.REACT_APP_UNSPLASH_ACCESS_KEY
  ? process.env.REACT_APP_UNSPLASH_ACCESS_KEY
  : '';
export const getImagesResult = async (pageNumber: number) => {
  const response = await unsplashApi.get(
    `https://api.unsplash.com/photos?page=${pageNumber}&per_page=20&order_by=popular&client_id=${accessKey}`
  );
  return response.data;
};

export const getImagesBySearchTerm = async (searchTerm: string) => {
  const response = await unsplashApi.get(
    `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&per_page=15&client_id=${accessKey}`
  );
  return response.data.results;
};

export const getImageById = async (imgId: string) => {
  const response = await unsplashApi.get(
    `https://api.unsplash.com/photos/${imgId}?&client_id=${accessKey}`
  );
  return response.data;
};
