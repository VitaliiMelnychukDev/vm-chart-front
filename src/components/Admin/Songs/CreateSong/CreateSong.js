import MainContentWrapper from '../../../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import SongForm from '../SongForm/SongForm';
import useAuth from '../../../../store/auth';
import { UserHelper } from '../../../../helpers/user';
import Alert from '@material-ui/lab/Alert';

const CreateSong = () => {
  const { t } = useTranslation();
  const { user } = useAuth();

  const content = user && UserHelper.canManageSongs(user.roles)
    ? <SongForm></SongForm>
    : <Alert severity="error">{t('shared.errors.no-permissions')}</Alert>;

  return (
    <MainContentWrapper subHeaderTitle={t('songs.buttons.create-song')}>
      {content}
    </MainContentWrapper>
  );
}

export default CreateSong;