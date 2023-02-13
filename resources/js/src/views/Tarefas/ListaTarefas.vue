<template>
    <Formulario @aoSalvarTarefa="salvar" />
    <div class="list">
        <div class="field">
            <p class="control has-icons-left">
                <input class="input" type="text" placeholder="Filtrar tarefas" v-model="filtro">
                <span class="icon is-small is-left">
                    <i class="fas fa-search"></i>
                </span>
            </p>
        </div>
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa" />
        <Box v-if="listaVaziaDeTarefa">
            Nenhuma tarefa criada ainda ou o filtro utilizado não possúi nenhuma referência!
        </Box>
        <Modal :aberto="tarefaSelecionada" :titulo="'Editar tarefa'" :nome_botao_salvar="'Salvar alterações da tarefa'"
            :habilitar_botao_salvar="tarefaSelecionadaTemDescricao" @aoModalFechado="removerSelecaoTarefa"
            @aoModalSalvado="alterar" v-if="tarefa_selecionada">
            <div class="field">
                <label for="descricao" class="label">Descrição</label>
                <input type="text" class="input" v-model="tarefa_selecionada.description" id="descricao"
                    placeholder="Insira a descrição">
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed, ref, watchEffect, watch } from 'vue';
    import Formulario from '@/components/Formulario.vue';
    import Tarefa from '@/components/Tarefa.vue';
    import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
    import TarefaInterface from '@/interfaces/TarefaInterface';
    import Box from '@/components/Box.vue';
    import { useTarefaStore } from '@/stores/tarefa';
    import { NotificacaoMixin } from '@/mixins/Notificar';
    import Modal from "@/components/Modal.vue";

    export default defineComponent({
        name: 'ListaTarefas',
        data() {
            return {
                tarefa_selecionada: null as TarefaInterface,
            }
        },
        computed: {
            listaVaziaDeTarefa(): boolean {
                return this.tarefas && this.tarefas.length === 0;
            },
            tarefaSelecionada(): boolean {
                return this.tarefa_selecionada != null
            },
            tarefaSelecionadaTemDescricao(): boolean {
                return this.tarefa_selecionada.description ? true : false;
            }
        },
        mixins: [NotificacaoMixin],
        methods: {
            salvar(tarefa: TarefaInterface) {
                this.tarefa.nova(tarefa)
                    .then(async() => {
                        this.tarefa.todas();
                        this.notificar(TipoNotificacao.SUCESSO, 'Feito!', `Tarefa cadastrada com sucesso.`);
                    })
                    .catch(async(erro) => {
                        console.error(erro)
                        this.notificar(TipoNotificacao.FALHA, 'Ops!', `Não foi possível cadastrar a tarefa.`);
                    })
            },
            alterar() {
                this.tarefa.alterar(this.tarefa_selecionada)
                    .then(() => {
                        this.removerSelecaoTarefa();
                        this.notificar(TipoNotificacao.SUCESSO, 'Feito!', `Tarefa alterada com sucesso.`);
                    })
                    .catch(() => {
                        this.notificar(TipoNotificacao.FALHA, 'Ops!', `Não foi possível alter a tarefa.`);
                    })
            },
            selecionarTarefa(tarefa: TarefaInterface) {
                this.tarefa_selecionada = tarefa;
            },
            removerSelecaoTarefa() {
                this.tarefa_selecionada = null;
            },
        },
        components: {
            Formulario,
            Tarefa,
            Box,
            Modal
        },
        setup() {
            const tarefa = useTarefaStore();
            const filtro = ref("");
            tarefa.todas();
            watch(filtro,() => {
                tarefa.todas(filtro.value)
            })
            return {
                tarefas: computed(() => tarefa.tarefas),
                tarefa,
                filtro,
            }
        }
});
</script>
