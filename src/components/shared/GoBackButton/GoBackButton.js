import './GoBackButton.scss'
import { Link } from 'react-router-dom';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

const GoBackButton = ({ link, text }) => {
  const { t } = useTranslation();

  return (
    <div className="go-back-container">
      <Link to={link}>
        <Button
          size="medium"
          variant="contained"
          color="primary"
        >{t(text)}</Button>
      </Link>
    </div>
  )
}

GoBackButton.propTypes = {
  link: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default GoBackButton