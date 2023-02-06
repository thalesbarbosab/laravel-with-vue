<template>
    <Box>
        <div class="columns clicavel" @click="tarefaClicada">
            <div class="column is-0">
                <i class="far fa-check-square"></i>
            </div>
            <div class="column is-4">
                {{ tarefa.descricao || '[Tarefa sem descrição]' }}
            </div>
            <div class="column is-3">
                {{ tarefa.projeto?.nome_do_projeto }}
            </div>
            <div class="column is-3">
                {{ tarefa.duracao_em_segundos }}
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
        emits: ['aoTarefaClicada'],
        props: {
            tarefa: {
                type: Object as PropType<TarefaInterface>,
                required: true
            }
        },
        methods: {
            tarefaClicada(): void {
                this.$emit('aoTarefaClicada',this.tarefa);
            }
        },
        components: {
            Box
        }
    })
</script>
<style scoped>
    .clicavel {
        cursor: pointer;
    }
</style>
