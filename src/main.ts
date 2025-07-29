import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHashHistory } from 'vue-router'

import App from './App.vue'
import './assets/main.css'
import { initializeAnalytics } from './utils/analytics'

const routes = [
  { path: '/', component: () => import('./views/HomeView.vue') }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')

// Initialiser l'analytics après le montage de l'app
initializeAnalytics()