import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';

import { NotificacaoInterface } from '@/interfaces/NotificacaoInterface';

export interface Estado {
    notificacoes: NotificacaoInterface[],
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state: {
        notificacoes: [],
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
        //
    }
})

export function useStore() : Store<Estado>{
    return useStoreVuex(key);
}

