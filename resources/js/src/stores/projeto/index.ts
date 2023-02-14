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
            cliente_http.get('/projects')
                        .then(async(resposta) => {
                            this.projetos = resposta.data
                        })
                        .catch(async(erro) => {
                            console.error(erro)
                        })

        },
        novo(projeto : ProjetoInterface){
            return cliente_http.post('/projects', projeto, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
        },
        alterar(projeto : ProjetoInterface){
            return cliente_http.put(`/projects/${projeto.id}`, projeto);
        },
        remover(id_projeto){
            return cliente_http.delete(`/projects/${id_projeto}`);
        },
    },
    getters: {
       //
    }
})
