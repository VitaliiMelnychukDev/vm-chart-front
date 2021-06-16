import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { Button } from '@material-ui/core';
import './YesNoModal.scss';

const YesNoModal = ({ text, onYes, onNo }) => {
  const { t } = useTranslation();

  return (
    <div className="yes-no-container">
      <div className="yes-no-text">{t(text)}</div>
      <div className="yes-no-buttons-container">
        <div className="yes-no-buttons">
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={onYes}
            className="yes-button"
          >{t('shared.buttons.yes')}</Button>
          <Button
            size="large"
            variant="contained"
            color="primary"
            onClick={onNo}
          >{t('shared.buttons.no')}</Button>
        </div>
      </div>
    </div>
  );
}

YesNoModal.propTypes = {
  text: PropTypes.string.isRequired,
  onYes: PropTypes.func.isRequired,
  onNo: PropTypes.func.isRequired
}

export default YesNoModal;