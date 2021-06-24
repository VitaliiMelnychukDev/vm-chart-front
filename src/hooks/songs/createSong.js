import { baseApiSongPath } from '../../constants/api/song';
import useCreateItem from '../base/createBase';

const useCreateSong = () => {
  const [loadingStatus, setSongToCreate] = useCreateItem(baseApiSongPath);

  return [loadingStatus, setSongToCreate];
}

export default useCreateSong;