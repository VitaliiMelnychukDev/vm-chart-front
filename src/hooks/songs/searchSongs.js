import { useEffect, useState } from 'react';
import useSearchBase from '../base/searchBase';
import { apiSongPath } from '../../constants/api/song';

const useSearchSongs = (filters = {}) => {
  const [songs, setSongs] = useState([]);
  const [pageCount, searchResponse, loadingStatus, setPage, setFilters] = useSearchBase(apiSongPath.Search, filters);

  useEffect(() => {
    if (searchResponse && searchResponse.songs) {
      setSongs(searchResponse.songs);
    }
  },[searchResponse]);

  return [
    pageCount, songs, loadingStatus, setPage, setFilters
  ];
};

export default useSearchSongs;