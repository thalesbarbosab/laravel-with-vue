<template>
    <div class="box formulario">
        <div class="columns">
            <div class="column is-8" role="form" aria-label="Formulário para criação de uma nova tarefa">
                <input type="text"
                       class="input"
                       placeholder="Qual a descrição da tarefa você deseja iniciar ?"
                       v-model="descricao">
            </div>
            <Cronometro @tempo_encerrado="finalizarTarefa"/>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    import Cronometro from './Cronometro.vue';

    export default defineComponent({
        name: 'Formulario',
        emits: ['aoSalvarTarefa'],
        components: {
            Cronometro
        },
        data () {
            return {
                descricao: null
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
        }
    })
</script>
<style scoped>
    .formulario {
      color: var(--texto-primario);
      background-color: var(--bg-primario);
    }
</style>
