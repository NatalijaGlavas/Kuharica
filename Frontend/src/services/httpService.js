import axios from "axios";



export const httpService = axios.create({
    baseURL: '/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});