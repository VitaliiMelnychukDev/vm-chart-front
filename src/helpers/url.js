import { baseGenrePath } from '../constants/paths/genre';
import { baseChartPath } from '../constants/paths/chart';
import { baseAdminSongPath } from '../constants/paths/admin/song';
import { baseAdminChartPath } from '../constants/paths/admin/chart';

export class UrlHelper {
  static buildGenreUrl(genre) {
    return `${baseGenrePath}/${genre}`;
  }

  static buildChartUrl(chartSlug) {
    return `${baseChartPath}/${chartSlug}`;
  }

  static buildUpdateSongUrl(songId) {
    return `${baseAdminSongPath}/${songId}`;
  }

  static buildUpdateChartUrl(chartId) {
    return `${baseAdminChartPath}/${chartId}`;
  }

  static buildUpdateChartSongsUrl(chartId) {
    return `${baseAdminChartPath}/${chartId}/update-songs`;
  }
}