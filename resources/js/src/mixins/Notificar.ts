import { NotificacaoInterface, TipoNotificacao } from '../interfaces/NotificacaoInterface';
import { store } from '../store';

export const NotificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string) : void{
            store.commit('NOTIFICAR',{
                titulo,
                texto,
                tipo,
            } as NotificacaoInterface);
        }
    },
}
