import { useEffect, useState } from 'react';
import { ApiUrlHelper } from '../../helpers/apiUrl';
import vmHttpClient from '../../clients/vmHttpClient';

const useGetChart = (chartId) => {
  const [chart, setChart] = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  useEffect ( () => {
    async function getChart() {
      setLoadingStatus({loading: true});

      try {
        const chart = await vmHttpClient.get(ApiUrlHelper.getChartUrl(chartId));

        setChart(chart);
        setLoadingStatus({loading: false});
      } catch (e) {
        setLoadingStatus({loading: false, error: e.statusCode});
      }
    }

    getChart();
  },[]);

  return [chart, loadingStatus];
};

export default useGetChart;