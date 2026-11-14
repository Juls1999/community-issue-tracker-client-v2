import type { StaffDashboardResponse } from '@/types/staffDashboard'
import api from './axios'

export const staffDashboardService = {
  async getDashboard(): Promise<StaffDashboardResponse> {
    const { data } = await api.get<{ data: StaffDashboardResponse }>('/api/staff/dashboard')

    return data.data
  },
}
