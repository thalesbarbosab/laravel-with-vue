<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            <i :class="classeBotao"></i>{{ textoBotao }}
        </button>
        <nav class="panel mt-5">
            <ul>
                <li>
                    <router-link to="/" class="link">
                        <i class="fas fa-tasks"></i> Tarefas
                    </router-link>
                    <router-link to="/projetos/" class="link">
                        <i class="fas fa-project-diagram"></i> Projetos
                    </router-link>
                </li>
            </ul>
        </nav>
    </header>
</template>
<script lang="ts">
    import { defineComponent } from 'vue'
    export default defineComponent({
        name: 'BarraLateral',
        emits: ['alteracaoDoTema'],
        computed: {
            textoBotao(){
                if(!this.modo_escuro){
                    return 'Ativar modo escuro';
                }
                return 'Desativar modo escuro';
            },
            classeBotao(){
                if(!this.modo_escuro){
                    return 'fas fa-moon';
                }
                return 'fas fa-sun';
            }
        },

        data (){
            return {
                modo_escuro : true
            }
        },
        methods: {
            alterarTema() : void {
                this.modo_escuro = !this.modo_escuro;
                this.$emit('alteracaoDoTema', this.modo_escuro);
            }
        }
    })
</script>
<style scoped>
    header {
        padding: 1rem;
        background: #0d3b66;
        width: 100%;
        height: 100vh;
        text-align: center;
    }
    i {
        padding: 0.30rem;
    }
    .panel li {
        margin: 8px 0;
    }
    .link {
        color: #fff
    }
    .link:hover {
        color: #FAF0CA;
    }
    .link.router-link-active {
        color: #FAF0CA;
    }
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>
