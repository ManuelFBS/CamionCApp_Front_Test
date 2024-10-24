/* eslint-disable no-unused-vars */
import axios from './axios';

export const getImageHeavyLoadByDNIAndInvoiceRequest = (cedula, recibo) =>
    axios.get(`images/image-heavyload/${cedula}/${recibo}`, {
        responseType: 'blob', // Esto asegura que se reciba la imagen como un archivo binario...
    });

export const getImageVolquetaByDNIAndInvoiceRequest = (cedula, recibo) =>
    axios.get(`images/image-volq/${cedula}/${recibo}`, {
        responseType: 'blob', // Esto asegura que se reciba la imagen como un archivo binario...
    });

export const getImageRefuelingByDNIAndInvoiceRequest = (cedula, recibo) =>
    axios.get(`images/image/${cedula}/${recibo}`, {
        responseType: 'blob', // Esto asegura que se reciba la imagen como un archivo binario...
    });
