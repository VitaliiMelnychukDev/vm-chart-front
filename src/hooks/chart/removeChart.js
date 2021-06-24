import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useRemoveItem from '../base/removeBase';

const useRemoveChart = () => {
  const [loadingStatus, setRemoveUrl] = useRemoveItem();
  const [chartIdToRemove, setChartIdToRemove] = useState('');

  useEffect (() => {
    if (!chartIdToRemove) {
      return;
    }

    setRemoveUrl(ApiUrlHelper.getChartUrlById(chartIdToRemove));
  },[chartIdToRemove]);

  return [loadingStatus, setChartIdToRemove];
};

export default useRemoveChart;