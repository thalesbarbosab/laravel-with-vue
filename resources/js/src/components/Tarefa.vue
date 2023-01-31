<template>
    <Box>
        <div class="columns">
            <div class="column is-0">
                <i class="far fa-check-square"></i>
            </div>
            <div class="column is-8">
                {{  tarefa.descricao  || '[Tarefa sem descrição]' }}
            </div>
            <div class="column is-3">
               {{  tarefa.duracao_em_segundos }}
            </div>
        </div>
    </Box>
</template>
<script lang="ts">
    import { defineComponent, PropType } from 'vue';
    import TarefaInterface from '../interfaces/TarefaInterface';
    import Box from './Box.vue';

    export default defineComponent({
       name: 'Tarefa',
       props: {
        tarefa: {
            type: Object as PropType<TarefaInterface>,
            required: true
        }
       },
       components : {
            Box
        }
    })
</script>
<style scoped>
</style>

