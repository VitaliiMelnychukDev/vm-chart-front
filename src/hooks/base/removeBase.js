import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';

const useRemoveItem = () => {
  const [removeUrl, setRemoveUrl] = useState('');
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function removeItem() {
      if (!removeUrl) {
        return;
      }

      setLoadingStatus({loading: true});

      try {
        await vmHttpClient.delete(removeUrl);

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    removeItem();
  },[removeUrl]);

  return [loadingStatus, setRemoveUrl];
};

export default useRemoveItem;