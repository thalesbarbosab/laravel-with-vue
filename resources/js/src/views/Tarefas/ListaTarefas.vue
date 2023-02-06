<template>
    <Formulario @aoSalvarTarefa="salvar" />
    <div class="list">
        <Tarefa v-for="(tarefa, index) in tarefas" :key="index" :tarefa="tarefa" @aoTarefaClicada="selecionarTarefa"/>
        <Box v-if="listaVaziaDeTarefa">
            Nenhuma tarefa criada ainda!
        </Box>
        <Modal
            :aberto="tarefaSelecionada"
            :titulo="'Editar tarefa'"
            :nome_botao_salvar="'Salvar alterações da tarefa'"
            @aoModalFechado="removerSelecaoTarefa"
            @aoModalSalvado="alterar"
            v-if="tarefa_selecionada">
            <div class="field">
                <label for="descricao" class="label">Descrição</label>
                <input type="text" class="input" v-model="tarefa_selecionada.descricao" id="descricao" placeholder="Insira a descrição">
            </div>
        </Modal>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import Formulario from '../../components/Formulario.vue';
    import Tarefa from '../../components/Tarefa.vue';
    import { TipoNotificacao } from '../../interfaces/NotificacaoInterface';
    import TarefaInterface from '../../interfaces/TarefaInterface';
    import Box from '../../components/Box.vue';
    import { useStore } from '../../store';
    import { NotificacaoMixin } from '../../mixins/Notificar';
    import Modal from '../../components/Modal.vue';

    export default defineComponent({
        name: 'ListaTarefas',
        data() {
            return {
                tarefa_selecionada : null as TarefaInterface | null
            }
        },
        computed: {
            listaVaziaDeTarefa(): boolean {
                return this.tarefas.length === 0;
            },
            tarefaSelecionada(): boolean {
                return this.tarefa_selecionada != null
            }
        },
        mixins: [NotificacaoMixin],
        methods: {
            salvar(tarefa: TarefaInterface) {
                this.store.dispatch('NOVA_TAREFA', tarefa)
                    .then(() => {
                        this.notificar(TipoNotificacao.SUCESSO, 'Feito!', `Tarefa cadastrada com sucesso.`);
                    })
                    .catch(() => {
                        this.notificar(TipoNotificacao.FALHA, 'Ops!', `Não foi possível cadastrar a tarefa.`);
                    })
            },
            alterar(){
                this.store.dispatch('ALTERAR_TAREFA', this.tarefa_selecionada)
                    .then(() => {
                        this.removerSelecaoTarefa();
                        this.notificar(TipoNotificacao.SUCESSO, 'Feito!', `Tarefa alterada com sucesso.`);
                    })
                    .catch(() => {
                        this.notificar(TipoNotificacao.FALHA, 'Ops!', `Não foi possível alter a tarefa.`);
                    })
            },
            selecionarTarefa(tarefa : TarefaInterface){
                this.tarefa_selecionada = tarefa;
            },
            removerSelecaoTarefa(){
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
        const store = useStore();
        store.dispatch('OBTER_TAREFAS');
        return {
            store,
            tarefas: computed(() => store.state.tarefas)
        }
    }
});
</script>
