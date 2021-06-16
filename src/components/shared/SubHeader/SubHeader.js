import PropTypes from 'prop-types';
import './SubHeader.scss';
import { useTranslation } from 'react-i18next';

export const SubHeader = ({ title }) => {
  const { t } = useTranslation();

  return (
    <div className="subheader">
      <span className="subheader-text content">{t(title)}</span>
    </div>
  )
}

SubHeader.propTypes = {
  title: PropTypes.string.isRequired
}

export default SubHeader;