<template>
    <div class="projetos">
        <h1 class="title">Projetos</h1>
        <router-view></router-view>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';
    export default defineComponent({
        name: 'Projetos',
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
        padding-block: 0.5rem;
    }
</style>
