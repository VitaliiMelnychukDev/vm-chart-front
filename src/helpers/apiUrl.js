import * as config from '../configs/base.json';
import { apiChartPath } from '../constants/api/chart';
import { baseApiSongPath } from '../constants/api/song';

export class ApiUrlHelper {
  static buildFullUrl(url) {
    return `${ApiUrlHelper.getBaseApiUrl()}${url}`
  }

  static buildUrlWithParams(url, queryParams = {}) {
    return `${url}?${ApiUrlHelper.buildQueryParams(queryParams)}`;
  }

  static buildQueryParams(queryParams) {
    const params = [];
    for (const [key, param] of Object.entries(queryParams)) {
      params.push(`${key}=${param}`);
    }

    return params.join('&');
  }

  static getBaseApiUrl() {
    return config.CHARTS_API_URL;
  }

  static getChartUrl(chartSlug) {
    return `${apiChartPath.GetBySlug}${chartSlug}`;
  }

  static getSongUrl(songId) {
    return `${baseApiSongPath}${songId}`;
  }
}