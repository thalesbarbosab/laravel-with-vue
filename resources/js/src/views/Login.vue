<template>
    <div class="login">
        <h1 class="title">Login</h1>
        <form @submit.prevent="login">
            <div class="field">
                <p class="control has-icons-left has-icons-right">
                    <input class="input" type="email" placeholder="Email" v-model="usuario.email" autocomplete="username">
                    <span class="icon is-small is-left">
                        <i class="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control has-icons-left">
                    <input class="input" type="password" placeholder="Senha" v-model="usuario.senha" autocomplete="current-password">
                    <span class="icon is-small is-left">
                        <i class="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div class="field">
                <p class="control">
                    <button class="button is-success is-rounded" type="submit">
                        Login
                    </button>
                </p>
            </div>
        </form>
    </div>
</template>
<script lang="ts">
    import { defineComponent, computed } from 'vue';
    import UsuarioInterface from '@/interfaces/UsuarioInterface';
    import { useUsuarioStore } from '@/stores/usuario';
    import { TipoNotificacao } from '@/interfaces/NotificacaoInterface';
    import { NotificacaoMixin } from '@/mixins/Notificar';
    export default defineComponent({
        name: 'Login',
        data() {
            return {
                usuario: {
                    email: '',
                    senha: ''
                } as UsuarioInterface
            }
        },
        mixins: [NotificacaoMixin],
        methods: {
            login() : void {
                this.usuario.login(this.usuario)
                    .then(async (resposta)=> {
                        this.limparFormulario()
                        this.usuario.definirTokenAcesso(resposta.data.access_token)
                        this.notificar(TipoNotificacao.SUCESSO,'Perfeito!',`Login realizado com sucesso!`);
                        this.$router.push('/projetos')
                    })
                    .catch(async () => {
                        this.notificar(TipoNotificacao.FALHA,'Ops!',`Credenciais incorretas!`);
                        this.usuario.removerTokenAcesso();
                    })
            },
            limparFormulario() : void {
                this.usuario.email = null;
                this.usuario.senha = null;
            }
        },
        setup(){
            const usuario = useUsuarioStore();
            return {
                usuario
            }
        }
    })
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
    padding-left: 1.25rem;
    padding-right: 40%;
}

@media only screen and (max-width: 1024px) {
    .field {
        padding-left: 1.25rem;
        padding-right: 30%;
    }
}

@media only screen and (max-width: 768px) {
    .field {
        padding-left: 1.25rem;
        padding-right: 1.25rem;
    }
}
</style>
