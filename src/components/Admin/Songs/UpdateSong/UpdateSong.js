import MainContentWrapper from '../../../shared/MainContentWrapper/MainContentWrapper';
import {useTranslation} from 'react-i18next';
import { useParams } from 'react-router-dom';
import useGetSong from '../../../../hooks/songs/getSong';
import useAuth from '../../../../store/auth';
import {UserHelper} from '../../../../helpers/user';
import SongForm from '../SongForm/SongForm';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../../shared/Loader/Loader';
import { useEffect } from 'react';

const UpdateSong = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [song, setSongIdToGet, loadingStatus] = useGetSong(id);
  const { user } = useAuth();

  const userHasPermissinsToManageSongs = () => {
    return user && UserHelper.canManageSongs(user.roles);
  }

  useEffect(() => {
    if (userHasPermissinsToManageSongs()) {
      setSongIdToGet(id);
    }
  }, []);

  const getContent = () => {
    if (!userHasPermissinsToManageSongs()) {
      return <Alert severity="error">{t('shared.errors.no-permissions')}</Alert>
    }

    if (loadingStatus && loadingStatus.error) {
      return <Alert severity="error">{t('songs.errors.get-fail')}</Alert>
    }

    if (loadingStatus && loadingStatus.loading) {
      return <Loader />
    }

    if (loadingStatus && loadingStatus.success ) {
      return <SongForm song={song} />
    }

    return '';
  }

  return (
    <MainContentWrapper subHeaderTitle={t('songs.form.buttons.update-song')}>
      {getContent()}
    </MainContentWrapper>
  );
}

export default UpdateSong;