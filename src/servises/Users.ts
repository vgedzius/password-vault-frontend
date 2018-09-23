import axios from 'axios';

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export default class Users {
  public static update = async (user: User) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Accounts/${user.id}`;
      const response = await axios.patch(url, user);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static get = async (userId: string) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Accounts/${userId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
}