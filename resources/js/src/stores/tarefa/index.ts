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
            cliente_http.get(url)
                        .then(async(resposta) => {
                            this.tarefas = resposta.data
                        })
                        .catch(async(erro) => {
                            console.error(erro)
                        })

        },
        nova(tarefa : TarefaInterface){
            return cliente_http.post('/tasks', tarefa, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    });
        },
        alterar(tarefa : TarefaInterface){
            return cliente_http.put(`/tasks/${tarefa.id}`, tarefa);
        },
        remover(id_tarefa){
            return cliente_http.delete(`/tasks/${id_tarefa}`);
        },
    },
    getters: {
       //
    }
})
