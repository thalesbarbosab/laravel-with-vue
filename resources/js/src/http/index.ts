import axios, { AxiosInstance } from "axios"

export const credenciais_api = {
    client_id: '986da057-0c94-4f7d-9983-bd0b3e554375',
    client_secret: 'FnjbCqiAVctIQjthJZsImyWmKMMLgqS0P74gGD7a',
    grant_type: 'password'
}

export const cliente_http : AxiosInstance = axios.create({
    baseURL: '/api',
    headers: {
        "Content-Type": 'application/json'
    }
})

export default cliente_http;
