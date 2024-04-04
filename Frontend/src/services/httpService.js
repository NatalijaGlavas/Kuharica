import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://kuharica.runasp.net/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});