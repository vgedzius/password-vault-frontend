import axios from 'axios';
import Users from './Users';

export interface Credentials {
  password: string;
  username: string;
  persist?: boolean;
}

export interface ChangePasswordPayload {
  oldPassword: string;
  newPassword: string;
}

export default class Auth {

  public static changePassword = async (payload: ChangePasswordPayload) => {
    try {
      const url = 'http://localhost:3000/api/Accounts/change-password';
      const response = await axios.post(url, payload);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static login = async (credentials: Credentials) => {
    try {
      const login = await axios.post('http://localhost:3000/api/Accounts/login', credentials)

      axios.defaults.headers.common.Authorization = login.data.id;

      const user = await Users.get(login.data.userId);

      return {
        userId: login.data.userId,
        token: login.data.id,
        user,
      }
    } catch (error) {
      throw error.response.data.error;
    }
  }
}