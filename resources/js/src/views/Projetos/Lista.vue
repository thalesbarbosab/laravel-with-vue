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
    import { useStore } from '../../store';
    export default defineComponent({
        name: 'Lista',
        data() {
            return {
                nome_do_projeto: '',
            }
        },
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
                this.store.commit('EXCLUIR_PROJETO',id)
            }
        },
        setup(){
            const store = useStore();
            return {
                store,
                projetos: computed(() => store.state.projetos)
            }
        }
    });
</script>
