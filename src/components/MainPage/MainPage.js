import MainContentWrapper from '../shared/MainContentWrapper/MainContentWrapper';
import { articles, charts } from '../../constants/pages/home';
import './MainPage.scss';
import ArticlesWrapper from '../shared/ArticlesWrapper/ArticlesWrapper';
import ChartsWrapper from '../shared/ChartsWrapper/ChartsWrapper';
import { Fragment } from 'react';

const MainPage = () => {
  return (
    <Fragment>
      <MainContentWrapper subHeaderTitle="home.titles.explore-new-music">
        <ArticlesWrapper articles={articles} />
      </MainContentWrapper>
      <MainContentWrapper subHeaderTitle="home.titles.explore-best-charts">
        <ChartsWrapper charts={charts} />
      </MainContentWrapper>
    </Fragment>
  )
}

export default MainPage