<template>
    <div class="modal" :class="{'is-active' : this.aberto}">
        <div class="modal-background"></div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">{{ this.titulo }}</p>
                <button class="delete" aria-label="close" @click="fechar"></button>
            </header>
            <section class="modal-card-body">
                <slot></slot>
            </section>
            <footer class="modal-card-foot">
                <button class="button is-success" @click="salvar">{{ this.nome_botao_salvar }}</button>
                <button class="button" @click="fechar">Cancelar</button>
            </footer>
        </div>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Modal',
        emits: ['aoModalFechado','aoModalSalvado'],
        props: {
            aberto: Boolean,
            titulo: String,
            nome_botao_salvar: String
        },
        methods: {
            fechar(){
                this.$emit('aoModalFechado')
            },
            salvar(){
                this.$emit('aoModalSalvado')
            }
        }
    });
</script>
