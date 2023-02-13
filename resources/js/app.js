import './bootstrap';
import { createApp } from 'vue';
import App from '@/App.vue';
import Roteador from '@/routers/Roteador.vue';
import { key, store } from '@/store';
import { createPinia } from 'pinia';

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.min.css'

createApp(App)
    .use(Roteador)
    .use(store, key)
    .use(createPinia())
    .mount('#app');
