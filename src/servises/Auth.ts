import axios from 'axios';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

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

      const user = await Auth.fetch(login.data.userId);

      return {
        userId: login.data.userId,
        token: login.data.id,
        user,
      }
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static update = async (user: User) => {
    try {
      const url = `http://localhost:3000/api/Accounts/${user.id}`;
      const response = await axios.patch(url, user);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static fetch = async (userId: string) => {
    try {
      const url = `http://localhost:3000/api/Accounts/${userId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
}