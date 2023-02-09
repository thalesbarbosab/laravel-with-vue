import { Module } from "vuex";
import UsuarioInterface from "@/interfaces/UsuarioInterface";
import { Estado } from "@/store";
import { cliente_http, credenciais_api} from '@/http';
import CredenciaisApiInterface from "@/interfaces/CredenciaisApiInterface";

export interface EstadoUsuario {
    usuario: UsuarioInterface
}

export const usuario: Module<EstadoUsuario,Estado> = {
    mutations: {
       //
    },
    actions: {
        'LOGIN'(contexto, usuario : UsuarioInterface){
            return cliente_http.post('/token',
                {
                    username: usuario.email,
                    password: usuario.senha,
                    client_id: credenciais_api.client_id,
                    client_secret: credenciais_api.client_secret,
                    grant_type: credenciais_api.grant_type
                } as CredenciaisApiInterface ,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }
            )
        },
    }
}


