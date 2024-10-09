/* eslint-disable no-unused-vars */
import axios from './axios';

export const getImageRefuelingByIDRequest = (refuelingID) =>
    axios.get(`images/image/${refuelingID}`);
