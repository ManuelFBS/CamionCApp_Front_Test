import axios from './axios.js';

export const addEmployeeRequest = (employee) =>
    axios.post('/personas/addpersona', employee);

export const showAllEmployeesRequest = () => axios.get('/personas');

export const getEmployeeByIdRequest = (_id) =>
    axios.get(`/personas/personaid/${_id}`);

export const getEmployeeByDniRequest = (cedula) =>
    axios.get(`/personas/personaced/${cedula}`);

// ---------------------------------------------------------------------------------------------------------------------------------------
// Actualización del empleado...
// export const updateEmployeeByIdRequest = (_id) => axios.patch(`/personas/persona/edit/${_id}`);

export const updateEmployeeByDniRequest = (data) =>
    axios.patch('/personas/persona/edit', data);
// ---------------------------------------------------------------------------------------------------------------------------------------

// ---------------------------------------------------------------------------------------------------------------------------------------
// Eliminar un empleado...
// export const deleteEmployeeByIdRequest = (_id) => axios.delete(`/personas/persona/delete/${_id}`);

export const deleteEmployeeByDniRequest = (cedula) =>
    axios.delete('/personas/persona/delete', { data: { cedula } });
// ---------------------------------------------------------------------------------------------------------------------------------------
