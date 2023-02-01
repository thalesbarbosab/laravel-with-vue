import './bootstrap';
import { createApp } from 'vue';
import App from './src/App.vue';
import Roteador from './src/routers/Roteador.vue';

import '@fortawesome/fontawesome-free/css/all.css'
import 'bulma/css/bulma.min.css'

const app = createApp();
app.component('app', App);
app.use(Roteador)
   .mount('#app');
