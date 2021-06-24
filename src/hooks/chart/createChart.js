import useCreateItem from '../base/createBase';
import { baseApiChartPath } from '../../constants/api/chart';

const useCreateChart = () => {
  const [loadingStatus, setChartToCreate] = useCreateItem(baseApiChartPath);

  return [loadingStatus, setChartToCreate];
}

export default useCreateChart;