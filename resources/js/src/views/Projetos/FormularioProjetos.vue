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
    import { useProjetoStore } from '@/stores/projeto';
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
                let projeto : ProjetoInterface = {
                    id: this.id,
                    name: this.nome_do_projeto,
                }
                if(this.id){
                    this.projeto.alterar(projeto)
                        .then(async()=>{
                            this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto alterado com sucesso`);
                            this.$router.push('/projetos')
                        })
                        .catch(async(erro)=>{
                            this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível alterar o projeto.`);
                        })
                }else{
                    this.projeto.novo(projeto)
                        .then(async()=>{
                            this.notificar(TipoNotificacao.SUCESSO,'Feito!',`Projeto cadastrado com sucesso.`);
                            this.$router.push('/projetos')
                        })
                        .catch(async (erro)=>{
                            this.notificar(TipoNotificacao.FALHA,'Ops!',`Não foi possível cadastrar o projeto.`);
                        })
                }
            }
        },
        setup(props){
            const projeto = useProjetoStore();
            const nome_do_projeto = ref("");
            if(props.id){
                const projeto_encontrado = projeto.projetos.find(projeto => projeto.id == props.id);
                nome_do_projeto.value = projeto_encontrado?.name || "";
            }
            return {
                projeto,
                nome_do_projeto
            }

        }
    });
</script>

