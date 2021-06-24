import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import useGetItem from '../base/getBase';

const useGetChartBySlug = () => {
  const [item, setItemUrlToGet, loadingStatus] = useGetItem();
  const [chartSlugToGet, setChartSlugToGet] = useState(null);

  useEffect (() => {
    if (!chartSlugToGet) {
      return;
    }
    setItemUrlToGet(ApiUrlHelper.getChartUrl(chartSlugToGet));
  },[chartSlugToGet]);

  return [item, setChartSlugToGet, loadingStatus];
};

export default useGetChartBySlug;