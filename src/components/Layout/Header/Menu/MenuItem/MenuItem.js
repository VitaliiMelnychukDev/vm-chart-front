import './MenuItem.scss';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';

const MenuItem = ({ link, title, onLinkClick }) => {
  const { t } = useTranslation();

  let linkEl = <Link to={link}>{t(title)}</Link>;
  linkEl = onLinkClick ? <span onClick={onLinkClick}>{linkEl}</span> : linkEl;

  return <span className="main-menu-item">{linkEl}</span>;
}

MenuItem.propTypes = {
  link: PropTypes.string,
  title: PropTypes.string.isRequired,
  onLinkClick: PropTypes.func
}

export default MenuItem;