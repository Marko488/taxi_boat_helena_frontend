import { reactive } from 'vue'
import api from '../services/api'

// Jednostavno stanje prijave (token + podaci admina), spremljeno u localStorage
// da prijava preživi osvježavanje stranice.
export const auth = reactive({
  token: localStorage.getItem('token') || '',
  admin: JSON.parse(localStorage.getItem('admin') || 'null'),
  get isLoggedIn() {
    return !!this.token
  },
})

export async function login(email, password) {
  const res = await api.post('/auth/login', { email, password })
  auth.token = res.data.token
  auth.admin = res.data.admin
  localStorage.setItem('token', auth.token)
  localStorage.setItem('admin', JSON.stringify(auth.admin))
}

export function logout() {
  auth.token = ''
  auth.admin = null
  localStorage.removeItem('token')
  localStorage.removeItem('admin')
}
