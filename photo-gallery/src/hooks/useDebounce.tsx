import { useEffect, useState } from 'react';

const useDebounce = (value: string, delay = 500) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const [searchHistory, setSearchHistory] = useState<Array<string>>(
    localStorage.getItem('searchHistory')
      ? JSON.parse(localStorage.getItem('searchHistory') as any)
      : []
  );

  const removeDuplicates = (arr: Array<string>) => {
    const filteredArray = arr.filter((el) => el !== '');
    return [...new Set(filteredArray)];
  };

  useEffect(() => {
    const id = setTimeout(() => {
      // setting timeout to not make api call on every word change, wait a bit for a word to be finished and then searches
      setDebouncedValue(value);
      // storing the searched words in local storage to later access from history page
      setSearchHistory((prevValue: Array<string>) => [value, ...prevValue]);
      localStorage.setItem(
        'searchHistory',
        JSON.stringify(removeDuplicates(searchHistory))
      );
    }, delay);

    return () => {
      // to clean up the timeout
      clearTimeout(id);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
