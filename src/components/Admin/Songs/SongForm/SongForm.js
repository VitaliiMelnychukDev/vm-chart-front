import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { Controller, useForm } from 'react-hook-form';
import './SongForm.scss';
import { Button } from '@material-ui/core';
import GoBackButton from '../../../shared/GoBackButton/GoBackButton';
import { adminSongPath } from '../../../../constants/paths/admin/song';
import { Fragment } from 'react';
import useCreateSong from '../../../../hooks/songs/createSong';
import Alert from '@material-ui/lab/Alert';
import { onlyNumbersPattern } from '../../../../constants/patterns/shared';
import useUpdateSong from '../../../../hooks/songs/updateSong';

const SongForm = ({ song }) => {
  const { handleSubmit, formState: { errors }, control } = useForm();
  const { t } = useTranslation();
  const [createSongLoadingStatus, setSongToCreate] = useCreateSong();
  const [updateSongLoadingStatus, setSongToUpdate] = useUpdateSong();

  const onFromSubmit = (data) => {
    if (!song || !song._id) {
      setSongToCreate(data);
    } else {
      setSongToUpdate({id: song._id, body: data});
    }
  }

  const getErrorBlock = () => {
    if (createSongLoadingStatus && createSongLoadingStatus.error) {
      return <Alert severity="error">{t('songs.errors.create-fail')}</Alert>
    }

    if (updateSongLoadingStatus && updateSongLoadingStatus.error) {
      return <Alert severity="error">{t('songs.errors.update-fail')}</Alert>
    }

    return '';
  }

  const getSuccessMessage = () => {
    if (createSongLoadingStatus && createSongLoadingStatus.success) {
      return 'songs.messages.song-created';
    }

    if (updateSongLoadingStatus && updateSongLoadingStatus.success) {
      return 'songs.messages.song-updated';
    }

    return '';
  }

  const disabledButton = createSongLoadingStatus.loading || updateSongLoadingStatus.loading;
  const buttonTranslation = song && song._id ? 'songs.form.buttons.update-song' : 'songs.form.buttons.create-song';
  const successMessage = getSuccessMessage();

  const content = successMessage
    ?  <Alert severity="success">{t(successMessage)}</Alert>
    : <form className="song-form-container" onSubmit={handleSubmit(onFromSubmit)}>
    <Controller
      control={control}
      rules={{ required: true }}
      name="name"
      defaultValue={(song && song.name) || ''}
      render={
        ({ field }) =>
          <TextField
            {...field}
            error={!!errors.name}
            id="standard-name"
            label={t('songs.form.labels.name')}
          />}
    />
    <Controller
      control={control}
      rules={{ required: true }}
      name="author"
      defaultValue={(song && song.author) || ''}
      render={
        ({ field }) =>
          <TextField
            {...field}
            error={!!errors.author}
            id="standard-name"
            label={t('songs.form.labels.author')}
          />}
    />
    <Controller
      control={control}
      rules={{ required: true, pattern: onlyNumbersPattern }}
      name="year"
      defaultValue={(song && song.year) || ''}
      render={
        ({ field }) =>
          <TextField
            {...field}
            error={!!errors.year}
            id="standard-name"
            label={t('songs.form.labels.year')}
          />}
    />
    {getErrorBlock()}
    <Button
      type="submit"
      size="large"
      variant="contained"
      color="primary"
      disabled={disabledButton}
    >{t(buttonTranslation)}</Button>
  </form>;

  return (
    <Fragment>
      {content}
      <GoBackButton text="songs.form.buttons.go-to-songs" link={adminSongPath.songs} />
    </Fragment>
  );
}

SongForm.propTypes = {
  song: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    author: PropTypes.string.isRequired
  })
};

export default SongForm;