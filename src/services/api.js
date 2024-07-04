import axios from 'axios';

const API_URL = 'http://212.113.102.189:7000';

export const register = (login, password) => {
  return axios.post(`${API_URL}/auth/register`, { login, password });
};

export const login = (login, password) => {
  return axios.post(`${API_URL}/auth/login`, { login, password });
};

export const fetchFolders = (parentId, token) => {
  return axios.get(`${API_URL}/drive/folders`, {
    params: { parentId },
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createFolder = (name, parentId, token) => {
  return axios.post(`${API_URL}/drive/folder`, { name, parentId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
