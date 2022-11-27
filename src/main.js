import { createApp } from 'vue';

import App from './App.vue';
import Login from './Login.vue';
import Home from './Home.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const routes = [
    { path: '/', component: Home },
    { path: '/login', component: Login },
];
export const router = createRouter({
    history: createWebHistory(),
    routes,
});
const app = createApp(App);
app.use(router);
app.use(vuetify);
app.mount('#app');