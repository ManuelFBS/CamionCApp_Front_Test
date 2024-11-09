/* eslint-disable no-unused-vars */
import axios from './axios';

export const getFormNumberRequest = () =>
    axios.get('/genformcounter/generateControlNumber');

export const cancelFormNumbRequest = (serial) =>
    axios.post('/genformcounter/cancelControlNumber', serial);
