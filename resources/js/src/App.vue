<template>
  <main class="columns is-gapless is-multiline" :class="classeModoEscuro">
    <div class="column is-one-quarter">
      <BarraLateral @alteracaoDoTema="alterarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
        <router-view></router-view>
    </div>
  </main>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import BarraLateral from './components/BarraLateral.vue';

  export default defineComponent({
    name: 'App',
    data(){
      return {
        modo_escuro_ativo: true
      }
    },
    computed: {
      classeModoEscuro() {
        if(this.modo_escuro_ativo){
            return 'modo-escuro';
        }
        return null;
      }
    },
    methods: {
      alterarTema(modo_escuro : boolean) : void {
        this.modo_escuro_ativo = modo_escuro;
      }
    },
    components: {
      BarraLateral,
    }
  });
</script>
<style>
    main{
        --bg-primario: #fff;
        --texto-primario: #000;
    }
    main.modo-escuro {
        --bg-primario: #2b2d42;
        --texto-primario: #ddd;
    }
    .list {
        padding: 1.25rem;
    }
    .conteudo {
        background-color: var(--bg-primario);
    }
</style>
