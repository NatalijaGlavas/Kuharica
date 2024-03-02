import axios from "axios";

export const httpService = axios.create({
    baseURL: 'http://natalijaglavas-001-site1.ltempurl.com/api/v1',
    headers:{
        'Content-Type': 'application/json'
    }
});