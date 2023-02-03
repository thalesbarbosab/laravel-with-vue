<template>
    <Formulario @aoSalvarTarefa="salvarTarefa" />
    <div class="list">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" />
        <Box v-if="listaVaziaDeTarefa">
            Nenhuma tarefa criada ainda!
        </Box>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import Formulario from '../../components/Formulario.vue';
    import Tarefa from '../../components/Tarefa.vue';
    import TarefaInterface from '../../interfaces/TarefaInterface';
    import Box from '../../components/Box.vue';

    export default defineComponent({
        name: 'ListaTarefas',
        data() {
            return {
                tarefas: [] as TarefaInterface[],
            }
        },
        computed: {
            listaVaziaDeTarefa(): boolean {
                return this.tarefas.length === 0;
            },
        },
        methods: {
            salvarTarefa(tarefa: TarefaInterface) {
                this.tarefas.push(tarefa);
            },
        },
        components: {
            Formulario,
            Tarefa,
            Box,
        }
    });
</script>
