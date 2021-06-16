import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';
import { ApiUrlHelper } from '../../helpers/apiUrl';

const useUpdateSong = () => {
  const [songToUpdate, setSongToUpdate] = useState({});
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function updateSong() {
      if (!songToUpdate || !songToUpdate.id || !songToUpdate.body) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        await vmHttpClient.patch(ApiUrlHelper.getSongUrl(songToUpdate.id), songToUpdate.body);

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    updateSong();
  },[songToUpdate]);

  return [loadingStatus, setSongToUpdate];
}

export default useUpdateSong;