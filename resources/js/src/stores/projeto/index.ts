import { defineStore } from "pinia";
import { cliente_http } from "@/http";
import ProjetoInterface from "@/interfaces/ProjetoInterface";
import { useUsuarioStore } from "@/stores/usuario";

export const useProjetoStore = defineStore('projeto',{
    state() {
        return {
            projetos : [] as ProjetoInterface[]
        }
    },
    actions: {
        todos() : void{
            const usuario = useUsuarioStore();
            cliente_http.get('/projects',
                        {
                            headers: {
                                'Authorization': `Bearer ${usuario.token_acesso}`,
                            }
                        })
                        .then(async(resposta) => {
                            this.projetos = resposta.data
                        })
                        .catch(async(erro) => {
                            console.error(erro)
                        })

        },
        novo(projeto : ProjetoInterface){
            const usuario = useUsuarioStore();
            return cliente_http.post('/projects', projeto, {
                        headers: {
                            'Authorization': `Bearer ${usuario.token_acesso}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
        },
        alterar(projeto : ProjetoInterface){
            const usuario = useUsuarioStore();
            return cliente_http.put(`/projects/${projeto.id}`, projeto,{
                        headers: {
                            'Authorization': `Bearer ${usuario.token_acesso}`,
                        }
                    });
        },
        remover(id_projeto){
            const usuario = useUsuarioStore();
            return cliente_http.delete(`/projects/${id_projeto}`,{
                        headers: {
                            'Authorization': `Bearer ${usuario.token_acesso}`,
                            'Content-Type': 'application/json'
                        }
                    });
        },
    },
    getters: {
       //
    }
})
