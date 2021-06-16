import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../shared/Loader/Loader';
import PaginationSection from '../../shared/PaginationSection/PaginationSection';
import useSearchSongs from '../../../hooks/songs/searchSongs';
import GoBackButton from '../../shared/GoBackButton/GoBackButton';
import { baseAdminPath } from '../../../constants/paths/admin/admin';
import ItemsList from '../ItemsList/ItemsList';
import useAuth from '../../../store/auth';
import { UserHelper } from '../../../helpers/user';
import Search from '../Search/Search';
import { useState } from 'react';
import Modal from '../../shared/Modal/Modal';
import YesNoModal from '../YesNoModal/YesNoModal';
import useRemoveSong from '../../../hooks/songs/removeSong';
import SpinnerWrapper from '../../shared/SpinnerWrapper/SpinnerWrapper';
import './Songs.scss';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { adminSongPath } from '../../../constants/paths/admin/song';
import { UrlHelper } from '../../../helpers/url';


//TODO removing does not work correctly.
const Songs = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const [pageCount, songs, loadingStatus, setPage, setFilters] = useSearchSongs();
  const [deleteSongId, setDeleteSongId] = useState('');
  const [removeSongLoadingStatus, setSongIdToRemove] = useRemoveSong();
  const [songsAreUpToDate, setSongsAreUpToDate] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const onItemRemove = (id) => {
    setDeleteSongId(id);
  }

  const onRemoveItemYes = () => {
    setSongIdToRemove(deleteSongId);
    setDeleteSongId('');
    setSongsAreUpToDate(false);
  }

  const onRemoveItemNo = () => {
    setDeleteSongId('');
  }

  const onFindSong = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm) {
      setFilters({
        searchTerm
      })
      setSearchTerm(searchTerm);
    }
  }

  const getItemsListsToShow = () => {
    return songs.map((song) => {
      return {
        title: `${song.author} - ${song.name}`,
        id: song._id,
        url: getUpdateUrl(song._id)
      }
    });
  }

  const getUpdateUrl = (id) => {
    return UrlHelper.buildUpdateSongUrl(id);
  }

  const getContent = () => {
    if (loadingStatus.error) {
      return <Alert severity="error">{t('shared.errors.server-error')}</Alert>;
    }

    const manageProps = UserHelper.canManageSongs(user.roles) ? { onRemove: onItemRemove } : {};

    return <ItemsList {...manageProps} items={getItemsListsToShow()} />
  }

  const content = loadingStatus.loading ? <Loader /> : getContent();

  const deleteSongBlock = deleteSongId ? ( <Modal>
    <YesNoModal onYes={onRemoveItemYes} onNo={onRemoveItemNo} text="songs.delete-message" />
  </Modal> ) : '';

  const spinnerWrapperBlock = removeSongLoadingStatus && removeSongLoadingStatus.loading ? <SpinnerWrapper /> : '';

  const errorBlock = removeSongLoadingStatus && removeSongLoadingStatus.error
    ? <Alert severity="error">{t('songs.errors.remove-fail')}</Alert>
    : '';

  if (removeSongLoadingStatus && removeSongLoadingStatus.success && !songsAreUpToDate ) {
    setPage(1);
    setFilters({
      searchTerm,
      timestamp: Date.now()
    });

    setSongsAreUpToDate(true);
  }

  const createSongButton = UserHelper.canManageSongs(user.roles) ? ( <Link to={adminSongPath.create} >
    <Button type="submit" size="large" variant="contained" color="primary">{t('songs.buttons.create-song')}</Button>
  </Link> ) : '';

  return (
    <MainContentWrapper subHeaderTitle={t('songs.title')}>
      <div className="songs-page-wrapper">
        {errorBlock}
        <div className="songs-table-header">
          <Search label="songs.search-text" onChange={onFindSong} />
          {createSongButton}
        </div>
        <div>
          {content}
        </div>
        <PaginationSection pageCount={pageCount} paginationClickHandler={handlePageClick} />
        <GoBackButton text={'shared.buttons.go-to-admin'} link={baseAdminPath} />
        {deleteSongBlock}
        {spinnerWrapperBlock}
      </div>
    </MainContentWrapper>
  );
}

export default Songs;