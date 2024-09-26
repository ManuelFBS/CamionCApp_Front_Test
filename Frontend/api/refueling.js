import axios from './axios';

export const createNewRefuelingForm = (data) =>
    axios.post('/refueling/create', data);

// export const getDriverByDniRequest = (cedula) =>
//     axios.get(`/refueling/driverced/${cedula}`);

// export const getVehicleByIDRequest = (id) =>
//     axios.get(`/refueling/vehicleid/${id}`);
