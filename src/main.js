import { createApp } from 'vue'

import App from './App.vue'
import Login from './Login.vue'
import Home from './Home.vue'
import NewFeedPage from './NewfeedPage.vue'
import UserInfo from './UserInfo.vue'
import EditInfo from './EditInfo.vue'
import { createRouter, createWebHistory } from 'vue-router'

// Vuetify
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
	components,
	directives
})

const routes = [
	{ path: '/', component: NewFeedPage, meta: { requiresAuth: true }},
	{ path: '/account/:id', name: 'account', component: UserInfo, meta: { requiresAuth: true }},
	{ path: '/account/edit', name: 'edit', component: EditInfo, meta: { requiresAuth: true }},
	{ path: '/chat', component: Home, meta: { requiresAuth: true } },
	{ path: '/login', component: Login }
]
export const router = createRouter({
	history: createWebHistory(),
	routes
})
router.beforeEach(async (to, from, next) => {
	const user = JSON.parse(localStorage.getItem('user'))
	if (user == null && to.meta.requiresAuth) {
		next('/login')
	} else next()
})
const app = createApp(App)
app.use(router)
app.use(vuetify)
app.mount('#app')
