import { NotificacaoInterface, TipoNotificacao } from '@/interfaces/NotificacaoInterface';
import { useNotificacaoStore } from '@/stores/notificacao';

export const NotificacaoMixin = {
    methods: {
        notificar(tipo: TipoNotificacao, titulo: string, texto: string) : void{
            const notificacao = useNotificacaoStore();
            notificacao.notificar({
                titulo,
                texto,
                tipo,
            } as NotificacaoInterface);
        }
    },
}
