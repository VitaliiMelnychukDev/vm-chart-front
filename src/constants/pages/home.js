import {UrlHelper} from '../../helpers/url';
import {rockGenre} from '../genres';
import {genrePath} from '../paths/genre';

export const metalChartsArticle = {
  title: 'shared.articles.metal.title',
  description: 'shared.articles.metal.description',
  image: '/images/ffdp-live.jpg',
  src: UrlHelper.buildGenreUrl(rockGenre.metal)
};

export const grungeChartsArticle = {
  title: 'shared.articles.grunge.title',
  description: 'shared.articles.grunge.description',
  image: '/images/rock-live.jpg',
  src: UrlHelper.buildGenreUrl(rockGenre.grunge)
};

export const punkChartsArticle = {
  title: 'shared.articles.punk.title',
  description: 'shared.articles.punk.description',
  image: '/images/punk.jpg',
  src: UrlHelper.buildGenreUrl(rockGenre.punk)
};

export const articles = [
  metalChartsArticle,
  grungeChartsArticle,
  punkChartsArticle,
  {
    title: 'shared.articles.all.title',
    description: 'shared.articles.all.description',
    image: '/images/rammstein-live.jpg',
    src: genrePath.genres
  }
];

export const charts = [
  {
    _id: 1,
    name: 'home.charts.top-100-rock.name',
    description: 'home.charts.top-100-rock.description',
    slug: 'top-100-rock'
  },
  {
    _id: 2,
    name: 'home.charts.top-100-metal.name',
    description: 'home.charts.top-100-metal.description',
    slug: 'top-100-metal'
  },
  {
    _id: 3,
    name: 'home.charts.modern-punk.name',
    description: 'home.charts.modern-punk.description',
    slug: 'modern-punk'
  }
]