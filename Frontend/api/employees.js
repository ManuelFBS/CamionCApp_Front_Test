import axios from './axios.js';

export const addEmployeeRequest = (employee) =>
  axios.post('/personas/addpersona', employee);
