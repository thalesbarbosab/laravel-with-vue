import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';
import cliente_http from '../http';

import ProjetosInterface from '../interfaces/ProjetoInterface';
import { NotificacaoInterface } from '../interfaces/NotificacaoInterface';
import TarefaInterface from '../interfaces/TarefaInterface';

interface Estado {
    projetos: ProjetosInterface[],
    notificacoes: NotificacaoInterface[],
    tarefas: TarefaInterface[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        projetos: [],
        notificacoes: [],
        tarefas: []
    },
    mutations: {
        // Projetos
        'ADICIONA_PROJETO'(state, nome_do_projeto : string){
            const projeto = {
                id: new Date().toISOString(),
                nome_do_projeto: nome_do_projeto
            } as ProjetosInterface
            state.projetos.push(projeto)
        },
        'ALTERA_PROJETO'(state, projeto : ProjetosInterface){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        'EXCLUIR_PROJETO'(state, id_projeto : string){
            state.projetos = state.projetos.filter(proj => proj.id != id_projeto);
        },
        'NOTIFICAR'(state, notificacao : NotificacaoInterface){
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes =  state.notificacoes.filter((notif)=> notif.id != notificacao.id)
            }, 3000)
        },
        'DEFINIR_PROJETOS'(state, projetos : ProjetosInterface[]){
            state.projetos = projetos;
        },
        // Tarefas
        'ADICIONA_TAREFA'(state, tarefa : TarefaInterface){
            state.tarefas.push(tarefa)
        },
        'DEFINIR_TAREFAS'(state, tarefas : TarefaInterface[]){
            state.tarefas = tarefas;
        },
    },
    actions: {
        // Projetos
        'OBTER_PROJETOS'({ commit }){
            cliente_http.get('projetos')
                        .then(resposta => commit('DEFINIR_PROJETOS', resposta.data))
                        .catch(erro =>console.error(erro));
        },
        'NOVO_PROJETO'(contexto, nome_do_projeto : string){
            return cliente_http.post('projetos',{
                nome_do_projeto: nome_do_projeto
            });
        },
        'ALTERAR_PROJETO'(contexto, projeto : ProjetosInterface){
            return cliente_http.put(`projetos/${projeto.id}`,projeto);
        },
        'REMOVER_PROJETO'({ commit }, id : string){
            return cliente_http.delete(`projetos/${id}`)
                .then(()=> commit('EXCLUIR_PROJETO', id))
                .catch(erro =>console.error(erro));
        },
        // Tarefas
        'NOVA_TAREFA'({ commit }, tarefa : TarefaInterface){
            return cliente_http.post('tarefas',tarefa)
                               .then(resposta => commit('ADICIONA_TAREFA', resposta.data))
        },
        'ALTERAR_TAREFA'(contexto, tarefa : TarefaInterface){
            return cliente_http.put(`tarefas/${tarefa.id}`,tarefa);
        },
        'OBTER_TAREFAS'({ commit }){
            cliente_http.get('tarefas')
                        .then(resposta => commit('DEFINIR_TAREFAS', resposta.data))
                        .catch(erro =>console.error(erro));
        },
    }
})

export function useStore() : Store<Estado>{
    return useStoreVuex(key);
}

