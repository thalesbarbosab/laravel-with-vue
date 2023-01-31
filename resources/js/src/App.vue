<template>
  <main class="columns is-gapless is-multiline" :class="classeModoEscuro">
    <div class="column is-one-quarter">
      <BarraLateral @alteracaoDoTema="alterarTema"/>
    </div>
    <div class="column is-three-quarter conteudo">
      <Formulario @aoSalvarTarefa="salvarTarefa" />
      <div class="list">
        <Tarefa v-for="(tarefa,index) in tarefas" :key="index" :tarefa="tarefa"/>
        <Box v-if="listaVaziaDeTarefa">
          Nenhuma tarefa criada ainda!
        </Box>
      </div>
    </div>

  </main>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';

  import BarraLateral from './components/BarraLateral.vue';
  import Formulario from './components/Formulario.vue';
  import Tarefa from './components/Tarefa.vue';
  import TarefaInterface from './interfaces/TarefaInterface';
  import Box from './components/Box.vue';

  export default defineComponent({
    name: 'App',
    data(){
      return {
        tarefas: [] as TarefaInterface[],
        modo_escuro_ativo: false
      }
    },
    computed: {
      listaVaziaDeTarefa() : boolean {
        return this.tarefas.length === 0;
      },
      classeModoEscuro() {
        if(this.modo_escuro_ativo){
            return 'modo-escuro';
        }
        return null;
      }
    },
    methods: {
      salvarTarefa(tarefa : TarefaInterface){
        this.tarefas.push(tarefa);
      },
      alterarTema(modo_escuro : boolean) : void {
        this.modo_escuro_ativo = modo_escuro;
      }
    },
    components: {
      BarraLateral,
      Formulario,
      Tarefa,
      Box,
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
