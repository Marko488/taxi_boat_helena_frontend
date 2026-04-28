import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeparturesLineView from '../views/DeparturesLineView.vue'
import ToursView from '../views/ToursView.vue'

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
  {
    path: '/izleti',
    name: 'izleti',
    component: ToursView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
