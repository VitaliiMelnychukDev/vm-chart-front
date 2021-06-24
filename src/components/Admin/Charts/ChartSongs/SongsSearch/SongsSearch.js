import './SongsSearch.scss'
import {Fragment, useState} from 'react';
import useSearchSongs from '../../../../../hooks/songs/searchSongs';
import Loader from '../../../../shared/Loader/Loader';
import Alert from '@material-ui/lab/Alert';
import Search from '../../../Search/Search';
import { useTranslation } from 'react-i18next';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import PropTypes from 'prop-types';
import ItemsList from '../../../ItemsList/ItemsList';

const SongsSearch = ({ addSong }) => {
  const { t } = useTranslation();
  const [pageCount, songs, loadingStatus, setPage, setFilters] = useSearchSongs();
  const [searchTerm, setSearchTerm] = useState('');

  const onSongAdd = (index) => {
    if (songs[index] !== undefined) {
      addSong(songs[index]);
    }
  }

  const onFindSong = (e) => {
    const searchTerm = e.target.value;

    if (searchTerm || searchTerm === '') {
      setFilters({
        searchTerm
      })
      setSearchTerm(searchTerm);
    }
  }

  const getSongsToShow = () => {
    const chartSongs = songs.map((song, index) => {
      return (
        <div className="list-item" key={song._id}>
          <div className="item-title">{song.name} - {song.author}</div>
          <div className="search-songs-actions">
            <AddCircleOutlineIcon className="search-song-add" onClick={() => { onSongAdd(index) }} />
          </div>
        </div>
      );
    })

    return <div className="list-container">{chartSongs}</div>
  }

  const getContent = () => {
    if (loadingStatus.error) {
      return <Alert severity="error">{t('shared.errors.server-error')}</Alert>;
    }

    return getSongsToShow();
  }

  const content = loadingStatus && loadingStatus.loading ? <Loader /> : getContent();

  return (
    <Fragment>
      <Search label="songs.search-text" onChange={onFindSong} />
      {content}
    </Fragment>
  );
}

ItemsList.propTypes = {
  addSong: PropTypes.func
}


export default SongsSearch;