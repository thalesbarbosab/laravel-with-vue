<template>
    <section>
        <div class="list">
            <router-link to="/projetos/novo" class="button">
                <span class="icon is-small">
                    <i class="fas fa-plus"></i>
                </span>
                <span>Novo projeto</span>
            </router-link>
        </div>
        <div class="list">
            <table class="table is-fullwidth"  v-if="!listaVaziaDeProjetos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome do projeto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="projeto in projetos" :key="projeto.id">
                        <td>{{ projeto.id  }}</td>
                        <td>{{ projeto.nome_do_projeto }}</td>
                        <td>
                            <router-link :to="`/projetos/${projeto.id}`" class="button">
                                <span class="icon is-small">
                                    <i class="fas fa-pencil-alt"></i>
                                </span>
                            </router-link>
                            <button class="button ml-2 is-danger">
                                <span class="icon is small" @click="excluir(projeto.id)">
                                    <i class="fas fa-trash"></i>
                                </span>
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <Box v-if="listaVaziaDeProjetos">
                Nenhum projeto criado ainda!
            </Box>
        </div>

    </section>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import Box from '../../components/Box.vue';
    import { TipoNotificacao } from '../../interfaces/NotificacaoInterface';
    import { NotificacaoMixin } from '../../mixins/Notificar';
    import { useStore } from '../../store';
    export default defineComponent({
        name: 'Lista',
        mounted(){
            if(this.listaVaziaDeProjetos){
               setTimeout(()=>this.notificar(TipoNotificacao.ATENCAO,'Ops!',`Não existe nenhum projeto cadastrado ainda. Clique no botão "Novo projeto" para cadastrar um novo.`),500);
            }
        },
        data() {
            return {
                nome_do_projeto: '',
            }
        },
        mixins: [NotificacaoMixin],
        computed: {
            listaVaziaDeProjetos(): boolean {
                return this.projetos.length === 0;
            },
        },
        components: {
            Box
        },
        methods: {
            excluir(id : string){
                this.store.dispatch('REMOVER_PROJETO', id)
                .then(() => {
                        this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto removido com sucesso`)
                    })
                    .catch(()=>{
                        this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível remover o projeto.`);
                    })
            }
        },
        setup(){
            const store = useStore();
            store.dispatch('OBTER_PROJETOS');
            return {
                store,
                projetos: computed(() => store.state.projetos)
            }
        }
    });
</script>
