import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import Vue3Toastify, { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

// Axios configuration
axios.defaults.baseURL = import.meta.env.VITE_API_URL
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Content-Type'] = 'application/json'

// No cookie-based authentication
axios.defaults.withCredentials = false
axios.defaults.withXSRFToken = false

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)

app.use(Vue3Toastify, {
  autoClose: 3000,
  position: toast.POSITION.TOP_RIGHT,
  theme: 'colored',
  pauseOnHover: true,
  closeOnClick: true,
})

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
      gcTime: 5 * 60 * 1000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

app.use(VueQueryPlugin, { queryClient })

const authStore = useAuthStore()

const token = localStorage.getItem('access_token')

if (token) {
  try {
    await authStore.getUser()
  } catch {
    localStorage.removeItem('access_token')
  }
}

app.use(router)
app.mount('#app')
