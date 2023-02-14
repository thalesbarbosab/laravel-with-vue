import axios, { AxiosInstance } from "axios"
import roteador from '@/routers/Roteador.vue';
import { useUsuarioStore } from "@/stores/usuario";
import { NotificacaoInterface } from '@/interface/NotificacaoInterface.vue'
import { useNotificacaoStore } from '@/stores/notificacao';
import { TipoNotificacao } from "@/interfaces/NotificacaoInterface";

export const credenciais_api = {
    client_id: '9877b67d-ae37-44a1-9fe9-e8fba35fe7a6',
    client_secret: 'ak4cVqvfjqpQwBQttx9P7aqSOV4PbutDPN8cGw8j',
    grant_type: 'password'
}

export const cliente_http : AxiosInstance = axios.create({
    baseURL: '/api',
})

cliente_http.interceptors.request.use(
    (config) => {
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
    }, (erro) => {
        console.error(erro)
        return erro;
    }
);

cliente_http.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        const notificacao = useNotificacaoStore();
        // Process Authorization Errors
        if(error.response.status >= 400 && error.response.status <= 403){
            const usuario = useUsuarioStore();
            usuario.removerTokenAcesso();
            roteador.push({name: 'login'});
            notificacao.notificar({
                titulo: 'Ops!',
                texto: 'Você não tem permissão para executar essa ação',
                tipo: TipoNotificacao.ATENCAO,
                id: 500,
            } as NotificacaoInterface);
            return error;
        }
        switch (error.response.status) {
            case 422:
                // Process Unprocessable Entity Errors
                Object.entries(error.response.data['errors']).forEach((item) => {
                    item.forEach((item2, index) => {
                        if(index > 0){
                            notificacao.notificar({
                                titulo: 'Verifique os dados informados!',
                                texto: `${item2}`,
                                tipo: TipoNotificacao.ATENCAO,
                                id: index
                            } as NotificacaoInterface);
                        }
                    })
                })
                throw error;
            break;
            default:
                notificacao.notificar({
                    titulo: 'Ops!',
                    texto: 'Ocorreu um erro ao executar a ultima operação.',
                    tipo: TipoNotificacao.ATENCAO,
                    id: 500,
                } as NotificacaoInterface);
            break;
        }
        return error;
    }
);

export default cliente_http;
