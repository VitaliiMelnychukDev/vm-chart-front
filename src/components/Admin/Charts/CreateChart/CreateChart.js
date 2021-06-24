import { useTranslation } from 'react-i18next';
import useAuth from '../../../../store/auth';
import { UserHelper } from '../../../../helpers/user';
import Alert from '@material-ui/lab/Alert';
import MainContentWrapper from '../../../shared/MainContentWrapper/MainContentWrapper';
import ChartForm from '../ChartForm/ChartForm';

const CreateChart = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const content = user && UserHelper.canManageCharts(user.roles)
    ? <ChartForm></ChartForm>
    : <Alert severity="error">{t('shared.errors.no-permissions')}</Alert>;

  return (
    <MainContentWrapper subHeaderTitle={t('admin-charts.buttons.create-chart')}>
      {content}
    </MainContentWrapper>
  );
}

export default CreateChart;