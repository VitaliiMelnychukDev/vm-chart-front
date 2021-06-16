import useAuth from '../../../store/auth';
import { Route, Redirect } from 'react-router-dom';
import { adminPath } from '../../../constants/paths/admin/admin';


const PrivateRoute = ({ ...options }) => {
  const { user } = useAuth();

  return user ? <Route {...options} /> : <Redirect  to={adminPath.login} />
}

export default PrivateRoute;