import { defineStore } from "pinia";
import { NotificacaoInterface } from "@/interfaces/NotificacaoInterface";

export const useNotificacaoStore = defineStore('notificacao',{
    state() {
        return {
            notificacoes : [] as NotificacaoInterface[]
        }
    },
    actions: {
        notificar(notificacao : NotificacaoInterface){
            notificacao.id = new Date().getTime();
            this.notificacoes.push(notificacao);
            setTimeout(() => {
                this.notificacoes =  this.notificacoes.filter((notif)=> notif.id != notificacao.id)
            }, 3000)
        },
    },
    getters: {
       //
    }
})
