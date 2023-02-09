<template>
    <div class="login">
        <h1 class="title">Login</h1>
        <form @submit.prevent="enviar">
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
    import { useStore } from '@/store';
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
        methods: {
            enviar() {
                this.store.dispatch('LOGIN', this.usuario)
                    .then((resposta)=> console.log(resposta))
                    .catch((error)=>console.error(error))
            }
        },
        setup(){
            const store = useStore();
            return {
                store
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
