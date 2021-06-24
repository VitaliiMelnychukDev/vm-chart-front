import './ChartSongs.scss';
import MainContentWrapper from '../../../shared/MainContentWrapper/MainContentWrapper';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import useGetChart from '../../../../hooks/chart/getChart';
import useAuth from '../../../../store/auth';
import { UserHelper } from '../../../../helpers/user';
import { Fragment, useEffect, useState } from 'react';
import Alert from '@material-ui/lab/Alert';
import Loader from '../../../shared/Loader/Loader';
import GoBackButton from '../../../shared/GoBackButton/GoBackButton';
import { adminChartPath } from '../../../../constants/paths/admin/chart';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { ArrayHelper } from '../../../../helpers/array';
import { Button } from '@material-ui/core';
import useUpdateChart from '../../../../hooks/chart/updateChart';
import SongsSearch from './SongsSearch/SongsSearch';

const ChartSongs = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const [chart, setChartIdToGet, loadingStatus] = useGetChart();
  const [songs, setSongs] = useState([]);
  const [updateChartLoadingStatus, setChartToUpdate] = useUpdateChart();
  const { user } = useAuth();

  const userHasPermissinsToManageCharts = () => {
    return user && UserHelper.canManageCharts(user.roles);
  }

  useEffect(() => {
    if (userHasPermissinsToManageCharts()) {
      setChartIdToGet(id);
    }
  }, []);

  useEffect(() => {
    if (chart) {
      setSongs(chart.songs);
    }
  }, [chart]);

  const onSongUp = (index) => {
    const newSongs = ArrayHelper.changeArrayIndexes(songs, index, index - 1);
    setSongs(newSongs);
  }

  const onSongDown = (index) => {
    const newSongs = ArrayHelper.changeArrayIndexes(songs, index, index + 1);
    setSongs(newSongs);
  }

  const onSongRemove = (index) => {
    const newSongs = ArrayHelper.removeArrayItem(songs, index);
    setSongs(newSongs);
  }

  const onSongAdd = (song) => {
    if(!song || !song._id) {
      return
    }
    const newSongs = ArrayHelper.addItemToArray(songs, {
      _id: song._id,
      song
    });
    setSongs(newSongs);
  }

  const onSaveSongsPositionsClick = () => {
    const chartSongsToSave = songs.map((song, index) => {
      return {
        position: index + 1,
        song: song.song._id
      }
    });

    setChartToUpdate({ id, body: {
      songs: chartSongsToSave
    } });
  }

  const getChartsSongs = () => {
    const chartSongs = songs.map((song, index) => {
      return (
        <div className="list-item" key={song._id}>
          <div className="item-title">{song.song.name} - {song.song.author}</div>
          <div className="chart-songs-actions">
            <div className="chart-songs-up-down-actions">
              <ArrowUpwardIcon className="chart-song-arrow-up" onClick={() => { onSongUp(index) }} />
              <ArrowDownwardIcon className="chart-song-arrow-down" onClick={() => { onSongDown(index) }} />
            </div>
            <div className="chart-songs-remove-action">
              <HighlightOffIcon className="chart-song-arrow-remove" onClick={() => { onSongRemove(index) }} />
            </div>
          </div>
        </div>
      );
    })

    return <div className="list-container">{chartSongs}</div>
  }

  const getChartSongsList = () => {
    return (
      <Fragment>
        {getChartsSongs()}
        <Button
          size="large"
          variant="contained"
          color="primary"
          className="save-songs-positions"
          onClick={onSaveSongsPositionsClick}
        >{t('admin-charts.form.buttons.save-songs-positions')}
        </Button>
        <SongsSearch addSong={onSongAdd} />
      </Fragment>
    );
  }

  const getContent = () => {
    if (!userHasPermissinsToManageCharts()) {
      return <Alert severity="error">{t('shared.errors.no-permissions')}</Alert>
    }

    if ((loadingStatus && loadingStatus.error) || (updateChartLoadingStatus && updateChartLoadingStatus.error)) {
      return <Alert severity="error">{t('admin-charts.errors.get-fail')}</Alert>
    }

    if ((loadingStatus && loadingStatus.loading) || (updateChartLoadingStatus && updateChartLoadingStatus.loading)) {
      return <Loader />
    }

    if (loadingStatus && loadingStatus.success) {
      return getChartSongsList();
    }

    return '';
  }


  return (
    <MainContentWrapper subHeaderTitle="admin-charts.text.update-chart-songs">
      <div className="chart-songs-container">
        {getContent()}
        <GoBackButton text="admin-charts.form.buttons.go-to-charts" link={adminChartPath.charts} />
      </div>
    </MainContentWrapper>
  );
}

export default ChartSongs;