import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';
import { baseApiSongPath } from '../../constants/api/song';

const useCreateSong = () => {
  const [songToCreate, setSongToCreate] = useState('');
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function createSong() {
      if (!songToCreate) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        await vmHttpClient.post(baseApiSongPath, songToCreate);

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    createSong();
  },[songToCreate]);

  return [loadingStatus, setSongToCreate];
}

export default useCreateSong;