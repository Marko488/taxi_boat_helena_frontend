import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import DeparturesLineView from '../views/DeparturesLineView.vue'
import ToursView from '../views/ToursView.vue'
import CancelReservationView from '../views/CancelReservationView.vue'
import AdminLoginView from '../views/admin/AdminLoginView.vue'
import AdminLayout from '../components/admin/AdminLayout.vue'
import AdminDeparturesView from '../views/admin/AdminDeparturesView.vue'
import AdminReservationsView from '../views/admin/AdminReservationsView.vue'
import { auth } from '../stores/auth'

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
  {
    path: '/otkazi',
    name: 'cancel-reservation',
    component: CancelReservationView,
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    component: AdminLoginView,
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: '', redirect: '/admin/polasci' },
      {
        path: 'polasci',
        name: 'admin-departures',
        component: AdminDeparturesView,
      },
      {
        path: 'rezervacije',
        name: 'admin-reservations',
        component: AdminReservationsView,
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,

  scrollBehavior(to) {
    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            el: to.hash,
            top: 72,
            behavior: 'smooth',
          })
        }, 100)
      })
    }

    return { top: 0, behavior: 'smooth' }
  },
})

// Zaštita admin ruta — ako nije prijavljen, preusmjeri na prijavu.
router.beforeEach((to) => {
  if (to.meta.requiresAuth && !auth.isLoggedIn) {
    return { name: 'admin-login' }
  }
  if (to.name === 'admin-login' && auth.isLoggedIn) {
    return { path: '/admin/polasci' }
  }
})

export default router
