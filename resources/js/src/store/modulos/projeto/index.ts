import { Module } from "vuex";
import ProjetoInterface from "../../../interfaces/ProjetoInterface";
import { Estado } from "../../../store";
import cliente_http from '../../../http';

export interface EstadoProjeto {
    projetos: ProjetoInterface[]
}

export const projeto: Module<EstadoProjeto,Estado> = {
    mutations: {
        'ADICIONA_PROJETO'(state, nome_do_projeto : string){
            const projeto = {
                id: new Date().toISOString(),
                nome_do_projeto: nome_do_projeto
            } as ProjetoInterface
            state.projetos.push(projeto)
        },
        'ALTERA_PROJETO'(state, projeto : ProjetoInterface){
            const index = state.projetos.findIndex(proj => proj.id == projeto.id);
            state.projetos[index] = projeto;
        },
        'EXCLUIR_PROJETO'(state, id_projeto : string){
            state.projetos = state.projetos.filter(proj => proj.id != id_projeto);
        },

        'DEFINIR_PROJETOS'(state, projetos : ProjetoInterface[]){
            state.projetos = projetos;
        },
    },
    actions: {
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
        'ALTERAR_PROJETO'(contexto, projeto : ProjetoInterface){
            return cliente_http.put(`projetos/${projeto.id}`,projeto);
        },
        'REMOVER_PROJETO'({ commit }, id : string){
            return cliente_http.delete(`projetos/${id}`)
                .then(()=> commit('EXCLUIR_PROJETO', id))
                .catch(erro =>console.error(erro));
        },
    }
}


