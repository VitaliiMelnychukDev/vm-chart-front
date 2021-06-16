import {baseAdminPath} from './admin';

export const baseAdminSongPath = `${baseAdminPath}/song`;

export const adminSongPath = {
  songs: `${baseAdminSongPath}s`,
  create: `${baseAdminSongPath}/create`,
  update: `${baseAdminSongPath}/:id`
}