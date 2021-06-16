import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import './Menu.scss';
import useAuth from '../../../../store/auth';
import MenuItem from './MenuItem/MenuItem';
import { baseAdminPath} from '../../../../constants/paths/admin/admin';
import { globalPath } from '../../../../constants/paths';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Menu = ({ menuItems, adminMenu, onMenuClose }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  let key = 0;
  const getKey = () => {
    return key++;
  }

  const onLogout = () => {
    logout();
    history.push(globalPath);
    onMenuClose();
  };

  const adminMenuItem = user && !adminMenu
    ? <MenuItem title="header.menu-item.admin" link={baseAdminPath} key={getKey()} onLinkClick={onMenuClose}/>
    : '';
  const logoutMenuItem = user
    ? <MenuItem title="header.menu-item.logout" key={getKey()} onLinkClick={onLogout} />
    : '';

  const menu = menuItems.map((menuItem) => {
    return (
      <MenuItem
        title={menuItem.title}
        link={menuItem.link}
        key={getKey()}
        onLinkClick={onMenuClose}
      />
    );
  });

  return (
    <div className="main-menu">
      <HighlightOffIcon className="close-icon" onClick={onMenuClose}></HighlightOffIcon>
      {menu}
      {adminMenuItem}
      {logoutMenuItem}
    </div>
  )
}

Menu.propTypes = {
  menuItems: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    title: PropTypes.string
  })),
  adminMenu: PropTypes.bool,
  onMenuClose: PropTypes.func.isRequired
}

export default Menu;

