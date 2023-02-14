import axios, { AxiosInstance } from "axios"
import roteador from '@/routers/Roteador.vue';
import { useUsuarioStore } from "@/stores/usuario";

export const credenciais_api = {
    client_id: '9877b67d-ae37-44a1-9fe9-e8fba35fe7a6',
    client_secret: 'ak4cVqvfjqpQwBQttx9P7aqSOV4PbutDPN8cGw8j',
    grant_type: 'password'
}

export const cliente_http : AxiosInstance = axios.create({
    baseURL: '/api',
})

cliente_http.interceptors.request.use(
    async (config) => {
        if(config.url == '/token'){
            return config;
        }
        config.headers.Accept = 'application/json';
        // config.headers['Content-Type'] = 'application/json';
        const usuario = useUsuarioStore();
        const token = usuario.obterTokenAcesso();
        if(!token){
            roteador.push({name: 'login'})
        }
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    }, async (erro) => {
        console.error(erro)
        return erro;
    }
);

cliente_http.interceptors.response.use(
    async (resposta) => resposta,
    async (error) => {
        if(error.response.status >= 400 && error.response.status <= 403){
            const usuario = useUsuarioStore();
            usuario.removerTokenAcesso();
            roteador.push({name: 'login'});
            return error;
        }
    }
);

export default cliente_http;
