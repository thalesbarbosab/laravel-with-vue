<template>
    <header>
        <h1>
            <img src="../assets/logo.png" alt="Logo">
        </h1>
        <button class="button" @click="alterarTema">
            <i :class="classeBotao"></i>{{ textoBotao }}
        </button>
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
                modo_escuro : false
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
    @media only screen and (max-width: 768px) {
        header {
            padding: 2.5rem;
            height: auto;
        }
    }
</style>
