import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeparturesLineView from '../views/DeparturesLineView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/linije',
    name: 'departures',
    component: DeparturesLineView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
