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
                    >{{ projeto.nome_do_projeto }}</option>
                </select>
                </div>
            </div>
            <Cronometro @tempo_encerrado="finalizarTarefa"/>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { useStore } from 'vuex';
    import { key } from '../store';
    import Cronometro from './Cronometro.vue';

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
                projeto: this.projetos.find(proj => proj.id == this.id_projeto)
            }
        },
        methods: {
            finalizarTarefa(tempo_encerrado : number) : void {
                this.$emit('aoSalvarTarefa',{
                    duracao_em_segundos: tempo_encerrado,
                    descricao: this.descricao
                });
                this.descricao = null;
            }
        },
        setup (){
            const store = useStore(key);
            return {
                projetos: computed(() => store.state.projetos)
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
