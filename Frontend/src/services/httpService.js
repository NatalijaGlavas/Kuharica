import axios from "axios";



export const httpService = axios.create({
    baseURL: 'https://localhost:7250/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});