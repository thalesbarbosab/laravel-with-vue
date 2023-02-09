import { Module } from "vuex";
import TarefaInterface from "@/interfaces/TarefaInterface";
import { Estado } from "@/store";
import { cliente_http } from '@/http';

export interface EstadoTarefa {
    tarefas: TarefaInterface[]
}

export const tarefa: Module<EstadoTarefa,Estado> = {
    mutations: {
        'ADICIONA_TAREFA'(state, tarefa : TarefaInterface){
            state.tarefas.push(tarefa)
        },
        'DEFINIR_TAREFAS'(state, tarefas : TarefaInterface[]){
            state.tarefas = tarefas;
        },
    },
    actions: {
        'NOVA_TAREFA'({ commit }, tarefa : TarefaInterface){
            return cliente_http.post('tarefas',tarefa)
                               .then(resposta => commit('ADICIONA_TAREFA', resposta.data))
        },
        'ALTERAR_TAREFA'(contexto, tarefa : TarefaInterface){
            return cliente_http.put(`tarefas/${tarefa.id}`,tarefa);
        },
        'OBTER_TAREFAS'({ commit }, filtro? : string){
            let url = 'tarefas';
            if(filtro){
                url += '?descricao=' + filtro;
            }
            cliente_http.get(url)
                        .then(resposta => commit('DEFINIR_TAREFAS', resposta.data))
                        .catch(erro =>console.error(erro));
        },
    }
}


