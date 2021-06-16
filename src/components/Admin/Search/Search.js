import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { useTranslation } from 'react-i18next';
import './Search.scss';

const Search = ({ label, onChange }) => {
  const { t } = useTranslation();

  return (
    <div className="search-container">
      <TextField
        id="outlined-required"
        label={t(label)}
        placeholder={t(label)}
        variant="outlined"
        onChange={onChange}
      />
    </div>
  );
}

Search.propTypes = {
  label: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
}

export default Search;