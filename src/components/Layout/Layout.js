import { Fragment } from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPage from '../MainPage/MainPage';
import { default as AdminCharts } from '../Admin/Charts/Charts';
import { globalPath } from '../../constants/paths';
import { chartPath } from '../../constants/paths/chart';
import { genrePath } from '../../constants/paths/genre';
import Genre from '../Genres/Genre/Genre';
import Genres from '../Genres/Genres';
import Chart from '../Charts/Chart/Chart';
import PageNotFound from '../PageNotFound/PageNotFound';
import { adminPath, baseAdminPath } from '../../constants/paths/admin/admin';
import Admin from '../Admin/Admin';
import Login from '../Admin/Login/Login';
import PrivateRoute from '../shared/PrivateRoute/PrivateRoute';
import Songs from '../Admin/Songs/Songs';
import Charts from '../Charts/Charts';
import { adminSongPath } from '../../constants/paths/admin/song';
import CreateSong from '../Admin/Songs/CreateSong/CreateSong';
import UpdateSong from '../Admin/Songs/UpdateSong/UpdateSong';

const Layout = () => {
  return (
    <Fragment>
      <Header />
      <main>
        <Switch>
          <Route path={globalPath} exact component={MainPage} />
          <Route path={chartPath.charts} exact component={Charts} />
          <Route path={chartPath.chart} exact component={Chart} />
          <Route path={genrePath.genres} exact component={Genres} />
          <Route path={genrePath.genre} exact component={Genre} />
          <PrivateRoute path={baseAdminPath} exact component={Admin} />
          <PrivateRoute path={adminSongPath.songs} exact component={Songs} />
          <PrivateRoute path={adminSongPath.create} exact component={CreateSong} />
          <PrivateRoute path={adminSongPath.update} exact component={UpdateSong} />
          <PrivateRoute path={adminPath.charts} exact component={AdminCharts} />
          <Route path={adminPath.login} exact component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </main>
      <Footer />
    </Fragment>
  )
}

export default Layout;