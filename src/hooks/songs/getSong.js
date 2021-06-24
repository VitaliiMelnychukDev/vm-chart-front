import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useGetItem from '../base/getBase';

const useGetSong = () => {
  const [item, setItemUrlToGet, loadingStatus] = useGetItem();
  const [songIdToGet, setSongIdToGet] = useState(null);

  useEffect ( () => {
    if (!songIdToGet) {
      return;
    }
    setItemUrlToGet(ApiUrlHelper.getSongUrl(songIdToGet));
  },[songIdToGet]);

  return [item, setSongIdToGet, loadingStatus];
}

export default useGetSong;