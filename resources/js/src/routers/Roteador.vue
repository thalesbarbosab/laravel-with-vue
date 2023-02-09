<script lang="ts">
    import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";

    import Login from "@/views/Login.vue";

    import Tarefas from '@/views/Tarefas.vue';
    import ListaTarefas from "@/views/Tarefas/ListaTarefas.vue";

    import Projetos from '@/views/Projetos.vue';
    import ListaProjetos from "@/views/Projetos/ListaProjetos.vue";
    import FormularioProjetos from "@/views/Projetos/FormularioProjetos.vue";

    const rotas : RouteRecordRaw[] = [
       {
            path: '/',
            component: Login
       },
       {
            path: '/tarefas',
            component: Tarefas,
            children: [
                {
                    path: '',
                    name: 'Tarefas',
                    component: ListaTarefas
                }
            ]
       },
       {
        path: '/projetos',
        component: Projetos,
        children: [
            {
                path: '',
                name: 'Projetos',
                component: ListaProjetos
            },
            {
                path: 'novo',
                name: 'Novo projeto',
                component: FormularioProjetos
            },
            {
                path: ':id',
                name: 'Editar projeto',
                component: FormularioProjetos,
                props: true
            }
        ]
       }
    ];

    const roteador = createRouter({
        history: createWebHashHistory(),
        routes: rotas
    });

    export default roteador

</script>
