import useGetChart from '../../../hooks/chart/getChart';
import { useParams } from 'react-router-dom';
import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import { chartPath } from '../../../constants/paths/chart';
import GoBackButton from '../../shared/GoBackButton/GoBackButton';
import Loader from '../../shared/Loader/Loader';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import { StatusCodes } from 'http-status-codes';
import Song from './Song/Song';
const Chart = () => {
  const { t } = useTranslation();
  const { slug } = useParams();
  const [chart, loadingStatus] = useGetChart(slug);

  const getSongs = () => {
    let chartPosition= 0;

    return chart.songs.map((song) => {
      chartPosition++;
      const songObject = song.song;
      return <Song
        author={songObject.author}
        year={songObject.year}
        position={chartPosition}
        name={songObject.name}
      />;
    });
  }

  const getContent = () => {
    if (loadingStatus.error) {
      const errorMessage = loadingStatus.error === StatusCodes.NOT_FOUND
        ? 'chart.errors.chart-did-not-found'
        : 'shared.errors.server-error';

      return <Alert severity="error">{t(errorMessage)}</Alert>;
    }
    if (!chart || !chart.songs || !chart.songs.length) {
      return <Alert severity="info">{t('chart.errors.chart-does-not-have-songs')}</Alert>;
    }

    return getSongs();
  }

  const subTitle = chart ? chart.name : 'shared.errors.title-error';

  let content = loadingStatus.loading ? <Loader /> : getContent();

  return (
    <MainContentWrapper subHeaderTitle={subTitle}>
      {content}
      <GoBackButton text={'chart.buttons.go-to-charts'} link={chartPath.charts} />
    </MainContentWrapper>
  );
}

export default Chart;