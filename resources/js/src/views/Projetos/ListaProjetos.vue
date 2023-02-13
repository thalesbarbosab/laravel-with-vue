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
            <table class="table is-fullwidth" v-if="!listaVaziaDeProjetos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome do projeto</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="projeto in this.projeto.projetos" :key="projeto.id">
                        <td>{{ projeto.id  }}</td>
                        <td>{{ projeto.name }}</td>
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
    import Box from '@/components/Box.vue';
    import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
    import { NotificacaoMixin } from '@/mixins/Notificar';
    import { useProjetoStore } from '@/stores/projeto';
    export default defineComponent({
        name: 'Lista',
        data() {
            return {
                nome_do_projeto: '',
            }
        },
        mixins: [NotificacaoMixin],
        computed: {
            listaVaziaDeProjetos(): boolean {
                return this.projeto.projetos && this.projeto.projetos.length === 0;
            },
        },
        components: {
            Box
        },
        methods: {
            excluir(id : string){
                this.projeto.remover(id)
                .then(async () => {
                        this.projeto.projetos = this.projeto.projetos.filter(proj => proj.id != id)
                        this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto removido com sucesso`)
                    })
                    .catch(async (erro)=>{
                        this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível remover o projeto.`);
                    })
            }
        },
        setup(){
            const projeto = useProjetoStore();
            projeto.todos();

            return {
                projeto
            }
        }
    });
</script>
