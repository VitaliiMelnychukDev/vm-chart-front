import { baseAdminPath } from './admin';

export const baseAdminChartPath = `${baseAdminPath}/chart`;

export const adminChartPath = {
  charts: `${baseAdminChartPath}s`,
  create: `${baseAdminChartPath}/create`,
  update: `${baseAdminChartPath}/:id`,
  updateSongs: `${baseAdminChartPath}/:id/update-songs`
}