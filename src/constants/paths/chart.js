import {globalPath} from './index';

export const baseChartPath = `${globalPath}chart`;

export const chartPath = {
  charts: `${baseChartPath}s`,
  chart: `${baseChartPath}/:slug`
}