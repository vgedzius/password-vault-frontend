import axios from 'axios';

export interface Password {
  id?: string;
  url: string;
  userName: string;
  password: string;
}

export default class Passwords {
  public static all = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Passwords`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static update = async (password: Password) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Passwords/${password.id}`;
      const { id, ...rest } = password;

      const response = await axios.patch(url, rest);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static get = async (userId: string) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Passwords/${userId}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static create = async (password: Password) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Passwords`;
      const response = await axios.post(url, password);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static delete = async (password: Password) => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/Passwords/${password.id}`;
      const response = await axios.delete(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }

  public static search = async (term: string) => {
    try {
      const url = term
        ? `${process.env.REACT_APP_API_URL}/Passwords/search?s=${term}`
        : `${process.env.REACT_APP_API_URL}/Passwords`;
      
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw error.response.data.error;
    }
  }
}