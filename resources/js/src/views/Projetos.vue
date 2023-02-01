<template>
    <section>
        <h1 class="title">Projetos</h1>
        <div class="box">
            <form @submit.prevent="salvar">
                <div class="field">
                    <label for="nome_do_projeto" class="label">nome do projeto</label>
                    <input type="text" class="input" v-model="nome_do_projeto" id="nome_do_projeto" placeholder="Insira o nome do projeto">
                </div>
                <div class="field">
                    <button class="button" type="submit">Salvar</button>
                </div>
            </form>
        </div>
        <div class="list">
            <table class="table is-fullwidth"  v-if="!listaVaziaDeProjetos">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nome do projeto</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="projeto in projetos" :key="projeto.id">
                        <td>{{ projeto.id  }}</td>
                        <td>{{ projeto.nome_do_projeto }}</td>
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
    import { defineComponent } from 'vue';
    import ProjetoInterface from '../interfaces/ProjetoInterface';
    import Box from '../components/Box.vue';
    export default defineComponent({
        name: 'Projetos',
        data() {
            return {
                nome_do_projeto: '',
                projetos: [] as ProjetoInterface[]
            }
        },
        computed: {
            listaVaziaDeProjetos(): boolean {
                return this.projetos.length === 0;
            },
        },
        methods: {
            salvar() {
                const projeto : ProjetoInterface = {
                    id: new Date().toISOString(),
                    nome_do_projeto: this.nome_do_projeto
                }
                this.projetos.push(projeto);
                this.nome_do_projeto = '';
            }
        },components: {
            Box
        }
    });
</script>
<style scoped>
    .title {
        font-size: 50px;
        padding: 1.0rem;
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
    .box {
        padding: 1.25rem;
    }
    .field {
        padding-block: 0.5rem;
    }
</style>
