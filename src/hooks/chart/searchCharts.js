import { useEffect, useState } from 'react';
import { apiChartPath } from '../../constants/api/chart';
import useSearchBase from '../base/searchBase';

const useSearchCharts = (filters = {}) => {
  const [charts, setCharts] = useState([]);
  const [pageCount, searchResponse, loadingStatus, setPage, setFilters] = useSearchBase(apiChartPath.Search, filters);

  useEffect(() => {
    if (searchResponse.charts) {
      setCharts(searchResponse.charts);
    }
  },[searchResponse]);

  return [
    pageCount, charts, loadingStatus, setPage, setFilters
  ]
};

export default useSearchCharts;