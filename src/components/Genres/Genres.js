import MainContentWrapper from '../shared/MainContentWrapper/MainContentWrapper';
import ArticlesWrapper from '../shared/ArticlesWrapper/ArticlesWrapper';
import { articles } from '../../constants/pages/genres';

const Genres = () => {
  return (
    <MainContentWrapper subHeaderTitle="genres.title">
      <ArticlesWrapper articles={articles} />
    </MainContentWrapper>
  )
}

export default Genres;