import { Route, Switch } from 'react-router-dom';
import './Header.scss';
import { globalPath } from '../../../constants/paths';
import mainMenuItems from '../../../constants/menu/main';
import adminMenuItems from '../../../constants/menu/admin';
import { useTranslation } from 'react-i18next';
import { baseAdminPath } from '../../../constants/paths/admin/admin';
import Menu from './Menu/Menu';
import { useState } from 'react';
import MenuIcon from '@material-ui/icons/Menu';

const Header = () => {
  const { t } = useTranslation();
  const [mobileMenuOpened, setMobileMenuOpened] = useState(false);

  const onOpenMenu = () => {
    setMobileMenuOpened(true);
  }

  const closeMenu = () => {
    setMobileMenuOpened(false);
  }

  return (
    <header className="header content">
      <div className="header-title">{t('header.title')}</div>
      <MenuIcon className="open-menu" onClick={onOpenMenu}></MenuIcon>
      <div className={`menu-container ${!mobileMenuOpened ? 'mobile-menu-hidden' : ''}`}>
        <Switch>
          <Route path={baseAdminPath}>
            <Menu menuItems={adminMenuItems} adminMenu={true} onMenuClose={closeMenu} />
          </Route>
          <Route path={globalPath}>
            <Menu menuItems={mainMenuItems} onMenuClose={closeMenu}  />
          </Route>
        </Switch>
      </div>
    </header>
  )
}

export default Header;