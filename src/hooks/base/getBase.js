import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';

const useGetItem = () => {
  const [itemUrlToGet, setItemUrlToGet] = useState(null);
  const [item, setItem] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function getItem() {
      if (!itemUrlToGet) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        const item = await vmHttpClient.get(itemUrlToGet);

        setItem(item);
        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    getItem();
  },[itemUrlToGet]);

  return [item, setItemUrlToGet, loadingStatus];
}

export default useGetItem;