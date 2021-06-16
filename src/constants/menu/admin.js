import {homeMenuItem} from './main';
import {adminPath} from '../paths/admin/admin';

const adminMenuItems = [
  homeMenuItem,
  {
    title: 'header.menu-item.charts',
    link: adminPath.charts
  },
  {
    title: 'header.menu-item.songs',
    link: adminPath.songs
  }
];

export default adminMenuItems;
