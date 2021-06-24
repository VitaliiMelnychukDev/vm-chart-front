import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useUpdateItem from '../base/updateBase';

const useUpdateChart = () => {
  const [chartToUpdate, setChartToUpdate] = useState({});
  const [loadingStatus, setSongDataToUpdate] = useUpdateItem();

  useEffect (() => {
    if (!chartToUpdate || !chartToUpdate.id || !chartToUpdate.body) {
      return;
    }

    setSongDataToUpdate({
      url: ApiUrlHelper.getChartUrlById(chartToUpdate.id),
      body: chartToUpdate.body
    });
  },[chartToUpdate]);

  return [loadingStatus, setChartToUpdate];
}

export default useUpdateChart;