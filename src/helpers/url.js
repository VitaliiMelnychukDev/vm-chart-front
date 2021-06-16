import { baseGenrePath } from '../constants/paths/genre';
import { baseChartPath } from '../constants/paths/chart';
import { baseAdminSongPath } from '../constants/paths/admin/song';

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
}