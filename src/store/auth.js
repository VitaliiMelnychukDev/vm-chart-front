import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { apiAuthPath } from '../constants/api/auth';
import { TokenHelper } from '../helpers/token';
import { baseApiAccountPath } from '../constants/api/account';
import vmHttpClient from '../clients/vmHttpClient';

const AuthContext = React.createContext(null);


export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadingStatus, setLoadingStatus] = useState({ loading: false });

  const login = async (email, password) => {
    setLoadingStatus({ loading: true });
      try {
        const loginResponse = await vmHttpClient.post(apiAuthPath.login, {
          email,
          password
        });

        setUser(loginResponse.user);
        TokenHelper.saveTokens(loginResponse.accessToken, loginResponse.refreshToken);
        setLoadingStatus({loading: false});
      } catch (e) {
        setLoadingStatus({loading: false, error: e.message});
      }
  }

  const logout = async () => {
    try {
      await vmHttpClient.post(apiAuthPath.logout, {
        refreshToken: TokenHelper.getRefreshToken()
      });

      clearUserData();
    } catch {
      clearUserData();
    }
  }

  const clearUserData = () => {
    TokenHelper.clearTokens();
    setUser(null);
  }

  const setAccount = async () => {
    try {
      const user = await vmHttpClient.get(baseApiAccountPath);
      setUser(user);
      setInitialLoading(false);
    } catch {
      setInitialLoading(false);
    }
  }

  useEffect(() => {
    const accessToken = TokenHelper.getAccessToken();

    if (!accessToken) {
      setInitialLoading(false);
      return;
    }

    setAccount(accessToken);
  }, []);

  return (
    <AuthContext.Provider value={{ user, initialLoading, loadingStatus, login, logout }}>
      {!initialLoading && children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
}

export default useAuth;