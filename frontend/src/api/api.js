import axios from 'axios';
const API_URL = 'http://localhost:3000';

export const uploadFile = (file) => {
  const formData = new FormData();
  formData.append('file', file);
  return axios.post(`${API_URL}/upload`, formData);
};

export const askQuestion = (question) => {
  return axios.post(`${API_URL}/ask`, { question });
};
