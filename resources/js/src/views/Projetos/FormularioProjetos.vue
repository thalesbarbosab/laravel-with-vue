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
    import { defineComponent, computed, ref } from 'vue';
    import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
import ProjetoInterface from '@/interfaces/ProjetoInterface';
    import { NotificacaoMixin } from '@/mixins/Notificar'
    import { useStore } from '@/store';
    export default defineComponent({
        name: 'Projetos',
        props : {
            id: {
                type: String
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
                    this.store.dispatch('ALTERAR_PROJETO',{
                        id: this.id,
                        nome_do_projeto: this.nome_do_projeto
                    } as ProjetoInterface)
                        .then(()=>{
                            this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto alterado com sucesso`);
                            this.$router.push('/projetos')
                        })
                        .catch(()=>{
                            this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível alterar o projeto.`);
                        })
                }else{
                    this.store.dispatch('NOVO_PROJETO',this.nome_do_projeto)
                        .then(()=>{
                            this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto cadastrado com sucesso.`);
                            this.$router.push('/projetos')
                        })
                        .catch(()=>{
                            this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível cadastrar o projeto.`);
                        })
                }
            }
        },
        setup(props){
            const store = useStore();
            const nome_do_projeto = ref("");
            if(props.id){
                const projeto = store.state.projeto.projetos.find(projeto => projeto.id == props.id);
                nome_do_projeto.value = projeto?.nome_do_projeto || "";
            }
            return {
                store,
                nome_do_projeto
            }

        }
    });
</script>

