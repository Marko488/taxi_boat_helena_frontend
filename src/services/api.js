import axios from 'axios'

// Zajednička axios instanca za pozive prema backendu.
// Automatski dodaje JWT token (ako postoji) u Authorization zaglavlje.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export default api
