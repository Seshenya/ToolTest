import axios from "axios";
export const BASE_URL = 'http://localhost:4000'
// const BASE_URL = 'https://gdsdt4-server.northeurope.cloudapp.azure.com'

export default axios.create({
    baseURL: BASE_URL
})
export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})