import $api from '../http/axios';

export default class AuthServices {
  static async login(email, password) {
    return $api.post('/api/user/login', { email, password });
  }
  static async registration(email, password, name) {
    return $api.post('/api/user/registration', { email, password, name });
  }
  static async logout() {
    return $api.post('/api/user/logout');
  }
  // static async autoLogin(token) {
  //   return $api.get('/api/user/refresh');
  // }
  static async autoLogin(token) {
    const header = `Bearer ${token}`;
    return await $api.get('/api/user/user', { headers: { Authorization: header } });
  }
}
