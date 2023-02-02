export enum TipoNotificacao {
    SUCESSO,
    FALHA,
    ATENCAO
}

export interface NotificacaoInterface {
    titulo: string,
    texto: string,
    tipo: TipoNotificacao,
    id: number
}
