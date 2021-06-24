import { useTranslation } from 'react-i18next';
import useAuth from '../../../../store/auth';
import { UserHelper } from '../../../../helpers/user';
import Alert from '@material-ui/lab/Alert';
import MainContentWrapper from '../../../shared/MainContentWrapper/MainContentWrapper';
import ChartForm from '../ChartForm/ChartForm';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Loader from '../../../shared/Loader/Loader';
import useGetChart from '../../../../hooks/chart/getChart';

const UpdateChart = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [chart, setChartIdToGet, loadingStatus] = useGetChart();
  const { user } = useAuth();

  const userHasPermissinsToManageCharts = () => {
    return user && UserHelper.canManageCharts(user.roles);
  }

  useEffect(() => {
    if (userHasPermissinsToManageCharts()) {
      setChartIdToGet(id);
    }
  }, []);

  const getContent = () => {
    if (!userHasPermissinsToManageCharts()) {
      return <Alert severity="error">{t('shared.errors.no-permissions')}</Alert>
    }

    if (loadingStatus && loadingStatus.error) {
      return <Alert severity="error">{t('admin-charts.errors.get-fail')}</Alert>
    }

    if (loadingStatus && loadingStatus.loading) {
      return <Loader />
    }

    if (loadingStatus && loadingStatus.success ) {
      return <ChartForm chart={chart} />
    }

    return '';
  }

  return (
    <MainContentWrapper subHeaderTitle={t('admin-charts.form.buttons.update-chart')}>
      {getContent()}
    </MainContentWrapper>
  );
}

export default UpdateChart;