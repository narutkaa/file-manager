import axios from 'axios';

const API_URL = 'http://212.113.102.189:7000';

export const fetchFolders = async (parentId, token) => {
  return await axios.get(`${API_URL}/drive/folder/${parentId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createFolder = async (name, parentId, token) => {
  return await axios.post(`${API_URL}/drive/folder`, { name, parentId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const uploadFile = async (file, parentId, token) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('folderId', parentId);

  return await axios.post(`${API_URL}/drive/files`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteFolder = async (folderId, token) => {
  return await axios.delete(`${API_URL}/drive/folder/${folderId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteFile = async (fileId, token) => {
  return await axios.delete(`${API_URL}/drive/files/${fileId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateFolder = async (folderId, name, token) => {
  return await axios.patch(`${API_URL}/drive/folder/${folderId}`, { name }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const moveFolder = async (folderId, parentId, token) => {
  return await axios.patch(`${API_URL}/drive/folder/${folderId}`, { parentId }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
