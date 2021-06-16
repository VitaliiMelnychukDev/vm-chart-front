import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import GoBackButton from '../../shared/GoBackButton/GoBackButton';
import { baseAdminPath } from '../../../constants/paths/admin/admin';

const Charts = () => {
  const { t } = useTranslation();

  return (
    <MainContentWrapper subHeaderTitle={t('charts.title')}>
      Charts Page
      <GoBackButton text={'shared.buttons.go-to-admin'} link={baseAdminPath} />
    </MainContentWrapper>
  );
}

export default Charts;