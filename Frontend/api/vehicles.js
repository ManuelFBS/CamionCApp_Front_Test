/* eslint-disable no-unused-vars */
import axios from './axios';

export const showAllVehiclesRequest = () => axios.get('/vehiculos');

export const assigningVehicleToDriverRequest = (data) =>
    axios.patch('/vehiculo/asignacion', data);
