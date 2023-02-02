import './bootstrap';
import { createApp } from 'vue';
import App from './src/App.vue';
import Roteador from './src/routers/Roteador.vue';
import { key, store } from './src/store';

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.min.css'

createApp(App)
    .use(Roteador)
    .use(store, key)
    .mount('#app');
