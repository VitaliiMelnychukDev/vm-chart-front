import { PropTypes } from 'prop-types';
import './Song.scss';

const Song = ({ position, name, author }) => {
  return (
    <div className="song-container">
      <div className="song-number"><span>{position}</span></div>
      <div className="song-detail">
        <span className="song-name">{name}</span>
        <span className="song-author">{author}</span>
      </div>
    </div>
  );
}

Song.propTypes = {
  position: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
}

export default Song;