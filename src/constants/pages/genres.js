import {UrlHelper} from '../../helpers/url';
import {rockGenre} from '../genres';
import {grungeChartsArticle, metalChartsArticle, punkChartsArticle} from './home';

export const articles = [
  metalChartsArticle,
  grungeChartsArticle,
  punkChartsArticle,
  {
    title: 'shared.articles.general.title',
    description: 'shared.articles.general.description',
    image: '/images/rammstein-live.jpg',
    src: UrlHelper.buildGenreUrl(rockGenre.general)
  },
  {
    title: 'shared.articles.alternative.title',
    description: 'shared.articles.alternative.description',
    image: '/images/rock-live.jpg',
    src: UrlHelper.buildGenreUrl(rockGenre.alternative)
  }
];