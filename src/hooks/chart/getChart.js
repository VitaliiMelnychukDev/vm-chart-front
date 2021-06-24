import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useGetItem from '../base/getBase';

const useGetChart = () => {
  const [item, setItemUrlToGet, loadingStatus] = useGetItem();
  const [chartIdToGet, setChartIdToGet] = useState(null);

  useEffect ( () => {
    if (!chartIdToGet) {
      return;
    }
    setItemUrlToGet(ApiUrlHelper.getChartUrlById(chartIdToGet));
  },[chartIdToGet]);

  return [item, setChartIdToGet, loadingStatus];
};

export default useGetChart;