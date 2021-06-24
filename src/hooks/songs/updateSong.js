import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useUpdateItem from '../base/updateBase';

const useUpdateSong = () => {
  const [songToUpdate, setSongToUpdate] = useState({});
  const [loadingStatus, setSongDataToUpdate] = useUpdateItem();

  useEffect ( () => {
    if (!songToUpdate || !songToUpdate.id || !songToUpdate.body) {
      return;
    }

    setSongDataToUpdate({
      url: ApiUrlHelper.getSongUrl(songToUpdate.id),
      body: songToUpdate.body
    });
  },[songToUpdate]);

  return [loadingStatus, setSongToUpdate];
}

export default useUpdateSong;