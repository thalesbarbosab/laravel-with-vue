import ProjetoInterface from "@/interfaces/ProjetoInterface";

export default interface TarefaInterface
{
    id? : Number,
    duracao_em_segundos : Number,
    descricao : String,
    projeto: ProjetoInterface
}
