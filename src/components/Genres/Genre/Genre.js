import { useParams } from 'react-router-dom';
import MainContentWrapper from '../../shared/MainContentWrapper/MainContentWrapper';
import PaginationSection from '../../shared/PaginationSection/PaginationSection';
import useSearchCharts from '../../../hooks/chart/searchCharts';
import Loader from '../../shared/Loader/Loader';
import Alert from '@material-ui/lab/Alert';
import { useTranslation } from 'react-i18next';
import ChartsWrapper from '../../shared/ChartsWrapper/ChartsWrapper';
import { genrePath } from '../../../constants/paths/genre';
import GoBackButton from '../../shared/GoBackButton/GoBackButton';

const Genre = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const filters = {
    ...(id && {genre: id})
  };

  const [pageCount, charts, loadingStatus, setPage] = useSearchCharts(filters);

  const handlePageClick = (e) => {
    setPage(e.selected + 1);
  };

  const getContent = () => {
    if (loadingStatus.error) {
      return <Alert severity="error">{t('shared.errors.server-error')}</Alert>;
    }

    if (!charts.length) {
      return <Alert severity="info">{t('genre.errors.charts-not-found')}</Alert>;
    }

    return <ChartsWrapper charts={charts} />;
  }

  const content = loadingStatus.loading ? <Loader /> : getContent();

  return (
    <MainContentWrapper subHeaderTitle="genre.title">
      <div>
        {content}
      </div>
      <PaginationSection pageCount={pageCount} paginationClickHandler={handlePageClick} />
      <GoBackButton text={'genre.buttons.go-to-genres'} link={genrePath.genres} />
    </MainContentWrapper>
  )
}

export default Genre;