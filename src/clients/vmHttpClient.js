import axios  from 'axios';
import {ApiUrlHelper} from '../helpers/apiUrl';
import {TokenHelper} from '../helpers/token';
import {authorizationCode, header} from '../constants/request';
import {apiAuthPath} from '../constants/api/auth';

const vmHttpClient = axios.create({
  baseURL: ApiUrlHelper.getBaseApiUrl()
});

vmHttpClient.interceptors.request.use((config) => {
  const authorizationHeader = TokenHelper.getAuthorizationHeader();

  if (authorizationHeader) {
    config.headers[header.authorization] = authorizationHeader;
  }

  return config;
});

vmHttpClient.interceptors.response.use(response => {
  return response.data.data;
}, err => {
  const originalRequest = err.config;
  const refreshToken = TokenHelper.getRefreshToken();

  if (err.response.status === authorizationCode.unauthorized && refreshToken && !originalRequest.retry) {
    originalRequest.retry = true;

    return axios.post(ApiUrlHelper.buildFullUrl(apiAuthPath.refresh),
      {
        refreshToken: TokenHelper.getRefreshToken()
      })
      .then(res => {
        TokenHelper.saveTokens(res.data.data.accessToken, res.data.data.refreshToken);

        return vmHttpClient(originalRequest);
      }).catch((error) => {
        TokenHelper.clearTokens();

        return Promise.reject(error.response.data);
      });
  } else {
    return Promise.reject(err.response.data);
  }
});

export default vmHttpClient;