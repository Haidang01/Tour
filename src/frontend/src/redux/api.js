import axios from 'axios';

const api = axios.create({ baseURL: 'http://localhost:8080' });

export const signIn = (FormData) => api.post('/api/v1/login', FormData);
export const signUp = (FormData) => api.post('/api/v1/register', FormData);


