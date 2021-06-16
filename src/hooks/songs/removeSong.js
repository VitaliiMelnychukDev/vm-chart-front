import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import vmHttpClient from '../../clients/vmHttpClient';

const useRemoveSong = () => {
  const [songIdToRemove, setSongIdToRemove] = useState('');
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function removeSong() {
      if (!songIdToRemove) {
        return;
      }

      setLoadingStatus({loading: true});

      try {
        await vmHttpClient.delete(ApiUrlHelper.getSongUrl(songIdToRemove));

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    removeSong();
  },[songIdToRemove]);

  return [loadingStatus, setSongIdToRemove];
};

export default useRemoveSong;