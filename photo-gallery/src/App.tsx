import { useState } from 'react';
import './App.css';
import { SWRConfig } from 'swr';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// hook import
import useDebounce from './hooks/useDebounce';

// component imports
import Layout from './Components/Layout';
import Home from './Components/Home';
import SearchBar from './Components/SearchBar';
import History from './Components/History';
import Modal from './Components/Modal';

function App() {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [imgId, setImgId] = useState();

  //call hook with 1000 millisecond to make it more visible 500 is better for user experience
  const debouncedSearchValue = useDebounce(searchValue, 500);

  return (
    <SWRConfig value={{ provider: () => new Map() }}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SearchBar
                    searchValue={searchValue}
                    setSearchValue={setSearchValue}
                  />
                  <Home
                    searchTerm={debouncedSearchValue}
                    setIsOpen={setIsOpen}
                    setImgId={setImgId}
                  />
                  {isOpen && <Modal setIsOpen={setIsOpen} imgId={imgId} />}
                </>
              }
            />
            <Route path="/history" element={<History />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </SWRConfig>
  );
}

export default App;
