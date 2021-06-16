import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';
import { ApiUrlHelper } from '../../helpers/apiUrl';

const useGetSong = () => {
  const [songIdToGet, setSongIdToGet] = useState(null);
  const [song, setSong] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function getSong() {
      if (!songIdToGet) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        const song = await vmHttpClient.get(ApiUrlHelper.getSongUrl(songIdToGet));

        setSong(song);
        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    getSong();
  },[songIdToGet]);

  return [song, setSongIdToGet, loadingStatus];
}

export default useGetSong;