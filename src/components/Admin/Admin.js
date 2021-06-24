import MainContentWrapper from '../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import './Admin.scss';
import useAuth from '../../store/auth';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { adminSongPath } from '../../constants/paths/admin/song';
import { adminChartPath } from '../../constants/paths/admin/chart';

const Admin = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  return (
    <MainContentWrapper subHeaderTitle={'admin.title'}>
      <div className="admin-container">
        <p className="admin-message">{t('admin.text', {name: user.name})}</p>
        <div className="admin-buttons">
          <Link to={adminSongPath.songs} >
            <Button size="large" variant="contained" color="primary">{t('admin.buttons.view-songs')}</Button>
          </Link>
          <Link to={adminChartPath.charts} >
            <Button size="large" variant="contained" color="primary">{t('admin.buttons.view-charts')}</Button>
          </Link>
        </div>
      </div>
    </MainContentWrapper>
  );
}

export default Admin;