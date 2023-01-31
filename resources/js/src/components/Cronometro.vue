<template>
    <div class="column">
        <div class="is-flex is-align-items-center is-justify-content-space-between">
            <section>
                <strong>{{ tempoDecorrido }}</strong>
            </section>
            <button class="button" @click="iniciar()" :disabled="executando">
                <span class="icon">
                    <i class="fas fa-play"></i>
                </span>
                <span>play</span>
            </button>
            <button class="button" @click="finalizar()" :disabled="!executando">
                <span class="icon">
                    <i class="fas fa-stop"></i>
                </span>
                <span>stop</span>
            </button>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'Cronometro',
    emits: ['tempo_encerrado'],
    computed: {
        tempoDecorrido(): string {
            // return new Date(this.tempo_em_segundos * 1000).toISOString().substr(11,8)
            return new Date(this.tempo_em_segundos * 1000).toISOString().substring(11, 19)
        }
    },
    data() {
        return {
            tempo_em_segundos: 0,
            cronometro: 0,
            executando: false
        }
    },
    methods: {
        iniciar() {
            this.cronometro = setInterval(() => {
                this.tempo_em_segundos += 1
            }, 1000)
            this.executando = true;
        },
        finalizar() {
            clearInterval(this.cronometro)
            this.executando = false;
            this.$emit('tempo_encerrado',this.tempoDecorrido);
            this.tempo_em_segundos = 0;
        }
    }
})
</script>