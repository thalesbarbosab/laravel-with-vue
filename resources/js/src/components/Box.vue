<template>
    <div class="box has-text-weight-bold">
        <slot></slot>
    </div>
</template>
<script lang="ts">
    import { defineComponent } from 'vue';

    export default defineComponent({
        name: 'Box',
    })
</script>
<style scoped>
    .box{
        background: rgb(143, 171, 236);
    }
</style>