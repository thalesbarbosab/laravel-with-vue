import { InjectionKey } from 'vue';
import { createStore, Store, useStore as useStoreVuex } from 'vuex';
import ProjetosInterface from '../interfaces/ProjetoInterface';

interface Estado {
    projetos: ProjetosInterface[]
}

export const key: InjectionKey<Store<Estado>> = Symbol()

export const store = createStore<Estado>({
    state:{
        projetos: []
    },
    mutations: {
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
        }
    }
})

export function useStore() : Store<Estado>{
    return useStoreVuex(key);
}

