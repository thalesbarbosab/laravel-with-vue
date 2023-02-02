<template>
    <section>
        <div class="box">
            <form @submit.prevent="salvar">
                <div class="field">
                    <label for="nome_do_projeto" class="label">nome do projeto</label>
                    <input type="text" class="input" v-model="nome_do_projeto" id="nome_do_projeto" placeholder="Insira o nome do projeto">
                </div>
                <div class="field">
                    <button class="button" type="submit">salvar</button>
                </div>
                <div class="field">
                    <router-link to="/projetos/" class="button">cancelar</router-link>
                </div>
            </form>
        </div>
    </section>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import { NotificacaoInterface, TipoNotificacao } from '../../interfaces/NotificacaoInterface';
    import { NotificacaoMixin } from '../../mixins/Notificar'
    import { useStore } from '../../store';
    export default defineComponent({
        name: 'Projetos',
        props : {
            id: {
                type: String
            }
        },
        mounted(){
            if(this.id){
                const projeto = this.store.state.projetos.find(projeto => projeto.id == this.id);
                this.nome_do_projeto = projeto?.nome_do_projeto;
            }
        },
        data() {
            return {
                nome_do_projeto: '',
            }
        },
        mixins: [NotificacaoMixin],
        methods: {
            salvar() {
                if(this.nome_do_projeto == ''){
                    this.notificar(TipoNotificacao.ATENCAO,'Ops!',`O nome do projeto é obrigatório!`);
                    return;
                }
                if(this.id){
                    this.store.commit('ALTERA_PROJETO',{
                        id: this.id,
                        nome_do_projeto: this.nome_do_projeto
                    })
                    this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto alterado com sucesso`);
                }else{
                    this.store.commit('ADICIONA_PROJETO',this.nome_do_projeto)
                    this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto cadastrado com sucesso`);
                }

                this.$router.push('/projetos')
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

