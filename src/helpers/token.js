import { localStorageKey } from '../constants/token';

export class TokenHelper {
  static getAccessToken() {
    return localStorage.getItem(localStorageKey.accessToken);
  }

  static getRefreshToken() {
    return localStorage.getItem(localStorageKey.refreshToken);
  }

  static saveTokens(accessToken, refreshToken) {
    localStorage.setItem(localStorageKey.accessToken, accessToken);
    localStorage.setItem(localStorageKey.refreshToken, refreshToken);
  }

  static clearTokens() {
    localStorage.removeItem(localStorageKey.accessToken);
    localStorage.removeItem(localStorageKey.refreshToken);
  }

  static getAuthorizationHeader() {
    const token = TokenHelper.getAccessToken();

    return token ? `Bearer ${token}` : '';
  }
}