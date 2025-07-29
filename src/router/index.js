import { createRouter, createWebHistory } from 'vue-router'
import CV from '../views/CV.vue'

const routes = [
  {
    path: '/',
    name: 'CV',
    component: CV
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router