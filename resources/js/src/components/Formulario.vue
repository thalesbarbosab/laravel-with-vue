<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-5" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text"
                       class="input"
                       placeholder="Qual a descrição da tarefa você deseja iniciar ?"
                       v-model="descricao">
            </div>
            <div class="column is-3">
                <div class="select">
                    <select v-model="id_projeto">
                    <option value="">selecione o projeto</option>
                    <option :value="projeto.id"
                            v-for="projeto in projetos"
                            :key="projeto.id"
                    >{{ projeto.name }}</option>
                </select>
                </div>
            </div>
            <Cronometro @tempo_encerrado="finalizarTarefa"/>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useProjetoStore } from '@/stores/projeto';
    import Cronometro from '@/components/Cronometro.vue';
    import TarefaInterface from '@/interfaces/TarefaInterface';

    export default defineComponent({
        name: 'Formulario',
        emits: ['aoSalvarTarefa'],
        components: {
            Cronometro
        },
        data () {
            return {
                id_projeto: null,
                descricao: null,
            }
        },
        methods: {
            finalizarTarefa(tempo_encerrado : number) : void {
                let projeto = this.projetos.find(proj => proj.id == this.id_projeto);
                this.$emit('aoSalvarTarefa',{
                    time: tempo_encerrado,
                    description: this.descricao,
                    project: projeto,
                    project_id: projeto.id
                } as TarefaInterface);
                this.descricao = null;
            }
        },
        setup (){
            const projeto = useProjetoStore();
            projeto.todos();
            return {
                projetos: projeto.projetos
            }
        }
    })
</script>
<style scoped>
    .formulario {
      color: var(--texto-primario);
      background-color: var(--bg-primario);
    }
</style>
