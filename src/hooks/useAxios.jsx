import axios from 'axios';
import React from 'react';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000' // do not put '/' into last. remember it.
})


const useAxios = () => {
    return axiosInstance;
};

export default useAxios;