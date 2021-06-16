import {globalPath} from './index';

export const baseGenrePath = `${globalPath}genre`;

export const genrePath = {
  genres: `${baseGenrePath}s`,
  genre: `${baseGenrePath}/:id`
}