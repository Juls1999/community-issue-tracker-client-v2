import type { LoginParams, RegisterParams, User } from '@/types'
import api from './axios'
interface LoginResponse {
  user: User
  token: string
  token_type: string
}

export const authService = {
  async getAuthenticatedUser(): Promise<User> {
    const { data } = await api.get<{ data: User }>('/api/user')
    return data.data
  },

  async registerUser(credentials: RegisterParams): Promise<User> {
    const { data } = await api.post<LoginResponse>('/api/register', {
      first_name: credentials.firstName,
      middle_name: credentials.middleName,
      last_name: credentials.lastName,
      phone_number: credentials.phoneNumber,
      barangay_id: credentials.barangayId,
      email: credentials.email,
      password: credentials.password,
      password_confirmation: credentials.passwordConfirmation,
    })

    localStorage.setItem('access_token', data.token)

    return data.user
  },

  async loginUser(credentials: LoginParams): Promise<User> {
    const { data } = await api.post<LoginResponse>('/api/login', credentials)

    localStorage.setItem('access_token', data.token)

    return data.user
  },

  async logoutUser(): Promise<void> {
    try {
      await api.post('/api/logout')
    } finally {
      localStorage.removeItem('access_token')
    }
  },
}
