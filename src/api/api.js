import axios  from 'axios';

import config from "../config.json"
// Create a new Axios instance with custom configurations
export const api = axios.create({
    // Allow sending cookies with requests
    withCredentials: true,
    // Set the base URL for all requests
    baseURL: config.API_URL,
    // Set the default Content-Type header for all requests
    headers: {
        "Content-Type": "application/json",
    },
});