import ProjetoInterface from "@/interfaces/ProjetoInterface";

export default interface TarefaInterface
{
    id? : Number,
    project_id? : String
    time : Number,
    description : String,
    project: ProjetoInterface,
}
