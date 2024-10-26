/* eslint-disable no-unused-vars */
import axios from './axios';

export const createNewHeavyLoadFormRequest = (data) =>
    axios.post('/heavyload/addheavyloadform', data);

export const genHLContRandNumberRequest = () =>
    axios.get('/heavyload/gennumber');
