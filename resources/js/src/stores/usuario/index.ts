import { defineStore } from "pinia";
import { cliente_http, credenciais_api} from "@/http";
import UsuarioInterface from "@/interfaces/UsuarioInterface";
import CredenciaisApiInterface from "@/interfaces/CredenciaisApiInterface";

export const useUsuarioStore = defineStore('usuario',{
    state() {
        return {
            token_acesso: null
        }
    },
    actions: {
        login(usuario : UsuarioInterface){
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
                );
        },
        verificarTokenApi(){
            return cliente_http.get('/token/verificar',{
                        headers: {
                            'Authorization': `Bearer ${this.token_acesso}`,
                            'Accept': 'application/json'
                        }
                    }
                );
        },
        obterTokenAcesso() {
            this.token_acesso = localStorage.getItem('token_acesso')
            return this.token_acesso;
        },
        definirTokenAcesso(token_acesso : string) : void {
            this.token_acesso = token_acesso;
            localStorage.setItem('token_acesso',token_acesso);

        },
        removerTokenAcesso() : void {
            this.token_acesso = null;
            localStorage.removeItem('token_acesso');
        }
    },
    getters: {
        acessoValido() : boolean {
            const token = this.obterTokenAcesso();
            if(token == null){
                return false;
            }
            const verificar_token_api = this.verificarTokenApi();
            if(!verificar_token_api){
                return false;
            }
            return true;
        },
        logado() : boolean {
            const token = this.obterTokenAcesso();
            if(token == null){
                return false;
            }
            return true;
        }
    }
})
