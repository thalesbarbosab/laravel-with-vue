import axios, { AxiosInstance } from "axios"


const cliente_http : AxiosInstance = axios.create({
    baseURL: 'http://localhost:3000/'
})

export default cliente_http
