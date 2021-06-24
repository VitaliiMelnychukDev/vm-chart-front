import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';

const useCreateItem = (url) => {
  const [itemToCreate, setItemToCreate] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function createItem() {
      if (!itemToCreate) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        await vmHttpClient.post(url, itemToCreate);

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    createItem();
  },[itemToCreate]);

  return [loadingStatus, setItemToCreate];
}

export default useCreateItem;