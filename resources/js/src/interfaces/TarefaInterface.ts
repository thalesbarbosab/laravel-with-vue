import ProjetoInterface from "./ProjetoInterface";

export default interface TarefaInterface
{
    index? : Number,
    duracao_em_segundos : Number,
    descricao : String,
    projeto: ProjetoInterface
}
