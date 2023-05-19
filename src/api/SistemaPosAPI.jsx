

import axios from 'axios';
import { getEnvVariables } from '../helpers/getEnvVariables';

const { VITE_API_URL } = getEnvVariables();

export const SistemaPosAPI = axios.create({

    baseURL: VITE_API_URL

})

// Interceptor de solicitudes
SistemaPosAPI.interceptors.request.use(
    config => {

        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`; // Agrega el token al header de la solicitud
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
