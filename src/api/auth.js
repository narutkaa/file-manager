import axios from 'axios';

const API_URL = 'http://212.113.102.189:7000';

export const register = async (login, password) => {
  return await axios.post(`${API_URL}/auth/register`, { login, password });
};

export const login = async (login, password) => {
  return await axios.post(`${API_URL}/auth/login`, { login, password });
};
