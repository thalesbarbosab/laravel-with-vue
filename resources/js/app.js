import './bootstrap';
import { createApp } from 'vue';
import App from '@/App.vue';
import Roteador from '@/routers/Roteador.vue';
import { createPinia } from 'pinia';

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.min.css'

createApp(App)
    .use(Roteador)
    .use(createPinia())
    .mount('#app');
