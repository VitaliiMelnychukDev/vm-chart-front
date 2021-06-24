import { useEffect, useState } from 'react';
import * as config from '../../configs/base.json';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import vmHttpClient from '../../clients/vmHttpClient';

const useSearchBase = (url, initialFilters = {}) => {
  const [pageCount, setPageCount] = useState(0);
  const [searchResults, serSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });
  const [filters, setFilters] = useState({})

  const countPerPage = config.PAGINATION.COUNT_PER_PAGE;

  useEffect ( () => {
    async function searchData() {
      setLoadingStatus({ loading: true });

      try {
        const chartsResponse = await vmHttpClient.get(ApiUrlHelper.buildUrlWithParams(url, {
          ...filters,
          ...initialFilters,
          limit: countPerPage,
          page: page
        }));
        const countPages = chartsResponse.totalCount / countPerPage;

        serSearchResults(chartsResponse);
        setPageCount(countPages);
        setLoadingStatus({ loading: false });
      } catch (e) {
        setLoadingStatus({ loading: false, error: e.message });
      }
    }

    searchData();
  },[page, filters]);

  return [
    pageCount, searchResults, loadingStatus, setPage, setFilters
  ]
};

export default useSearchBase;