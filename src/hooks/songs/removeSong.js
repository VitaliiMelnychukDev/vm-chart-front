import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useRemoveItem from '../base/removeBase';

const useRemoveSong = () => {
  const [loadingStatus, setRemoveUrl] = useRemoveItem();
  const [songIdToRemove, setSongIdToRemove] = useState('');

  useEffect ( () => {
    if (!songIdToRemove) {
      return;
    }

    setRemoveUrl(ApiUrlHelper.getSongUrl(songIdToRemove));
  },[songIdToRemove]);

  return [loadingStatus, setSongIdToRemove];
};

export default useRemoveSong;