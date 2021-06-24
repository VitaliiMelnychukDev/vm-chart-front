import { homeMenuItem } from './main';
import { adminChartPath } from '../paths/admin/chart';
import { adminSongPath } from '../paths/admin/song';

const adminMenuItems = [
  homeMenuItem,
  {
    title: 'header.menu-item.charts',
    link: adminChartPath.charts
  },
  {
    title: 'header.menu-item.songs',
    link: adminSongPath.songs
  }
];

export default adminMenuItems;
