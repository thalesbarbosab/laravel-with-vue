import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';

import { NotificacaoInterface } from '@/interfaces/NotificacaoInterface';
import { EstadoProjeto, projeto } from '@/store/modulos/projeto';
import { EstadoTarefa, tarefa } from '@/store/modulos/tarefa/';

export interface Estado {
    notificacoes: NotificacaoInterface[],
    tarefa: EstadoTarefa,
    projeto: EstadoProjeto
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
        tarefa: {
            tarefas: []
        },
        projeto: {
            projetos: []
        }
    },
    mutations: {
        'NOTIFICAR'(state, notificacao : NotificacaoInterface){
            notificacao.id = new Date().getTime();
            state.notificacoes.push(notificacao);
            setTimeout(() => {
                state.notificacoes =  state.notificacoes.filter((notif)=> notif.id != notificacao.id)
            }, 3000)
        },
    },
    actions: {
        //
    },
    modules: {
        projeto,
        tarefa,
    }
})

export function useStore() : Store<Estado>{
    return useStoreVuex(key);
}

