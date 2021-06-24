import { useEffect, useState } from 'react';
import vmHttpClient from '../../clients/vmHttpClient';

const useUpdateItem = () => {
  const [updateData, setUpdateData] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect (() => {
    async function updateItem() {
      if (!updateData || !updateData.url || !updateData.body) {
        return;
      }

      setLoadingStatus({ loading: true });

      try {
        await vmHttpClient.patch(updateData.url, updateData.body);

        setLoadingStatus({ loading: false, success: true });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.statusCode });
      }
    }

    updateItem();
  },[updateData]);

  return [loadingStatus, setUpdateData];
};

export default useUpdateItem;