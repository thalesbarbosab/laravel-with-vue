import { defineStore } from "pinia";
import { cliente_http } from "@/http";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { useUsuarioStore } from "@/stores/usuario";

export const useTarefaStore = defineStore('tarefa',{
    state() {
        return {
            tarefas : [] as TarefaInterface[]
        }
    },
    actions: {
        todas(filtro? : string) : void{
            let url = '/tasks';
            if(filtro){
                url += '?descricao=' + filtro;
            }
            const usuario = useUsuarioStore();
            cliente_http.get(url,{
                            headers: {
                                'Authorization': `Bearer ${usuario.token_acesso}`,
                            }
                        })
                        .then(async(resposta) => {
                            this.tarefas = resposta.data
                        })
                        .catch(async(erro) => {
                            console.error(erro)
                        })

        },
        nova(tarefa : TarefaInterface){
            const usuario = useUsuarioStore();
            return cliente_http.post('/tasks', tarefa, {
                        headers: {
                            'Authorization': `Bearer ${usuario.token_acesso}`,
                            'Content-Type': 'multipart/form-data'
                        }
                    });
        },
        alterar(tarefa : TarefaInterface){
            const usuario = useUsuarioStore();
            return cliente_http.put(`/tasks/${tarefa.id}`, tarefa,{
                        headers: {
                            'Authorization': `Bearer ${usuario.token_acesso}`,
                        }
                    });
        },
        remover(id_tarefa){
            const usuario = useUsuarioStore();
            return cliente_http.delete(`/tasks/${id_tarefa}`,{
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
