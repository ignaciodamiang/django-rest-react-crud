import axios from 'axios';

const URL =
  import.meta.env.VITE_NODE_ENV === 'production'
    ? import.meta.env.VITE_PROD_BACKEND_URL
    : import.meta.env.VITE_LOCAL_BACKEND_URL;

const tasksApi = axios.create({
  baseURL: `${URL}/tasks/api/v1/`,
});

export const getAllTasks = () => tasksApi.get('/');

export const getTask = (id) => tasksApi.get(`/${id}/`);

export const createTask = (task) => tasksApi.post('/', task);

export const deleteTask = (id) => tasksApi.delete(`/${id}/`);

export const updateTask = (id, task) => tasksApi.put(`/${id}/`, task);
