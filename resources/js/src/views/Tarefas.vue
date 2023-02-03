<template>
     <div class="tarefas">
        <h1 class="title">Tarefas</h1>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Tarefas'
    });
</script>
<style scoped>
    .title {
        font-size: 50px;
        padding: 1.0rem;
        color: var(--texto-primario);
        background-color: var(--bg-primario);
    }
</style>

