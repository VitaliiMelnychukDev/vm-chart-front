import {globalPath} from '../paths';
import {chartPath} from '../paths/chart';
import {genrePath} from '../paths/genre';

export const homeMenuItem = {
  title: 'header.menu-item.home',
  link: globalPath
}

const mainMenuItems = [
  homeMenuItem,
  {
    title: 'header.menu-item.charts',
    link: chartPath.charts
  },
  {
    title: 'header.menu-item.genres',
    link: genrePath.genres
  }
];

export default mainMenuItems;
