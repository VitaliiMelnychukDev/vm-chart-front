import { useEffect, useState } from 'react';
import { apiChartPath } from '../../constants/api/chart';
import useSearchBase from '../search/searchBase';

const useSearchCharts = (filters = {}) => {
  const [charts, setCharts] = useState([]);
  const [pageCount, searchResponse, loadingStatus, setPage ] = useSearchBase(apiChartPath.Search, filters);

  useEffect(() => {
    if (searchResponse.charts) {
      setCharts(searchResponse.charts);
    }
  },[searchResponse]);

  return [
    pageCount, charts, loadingStatus, setPage
  ]
};

export default useSearchCharts;