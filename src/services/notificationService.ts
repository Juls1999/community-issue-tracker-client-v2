import type { NotificationResponse } from '@/types/notification'
import api from './axios'

export const notificationService = {
  async getNotifications(page = 1): Promise<NotificationResponse> {
    const { data } = await api.get('/api/notifications', {
      params: { page },
    })

    return data
  },

  async markAsRead(notificationId: string): Promise<void> {
    await api.patch(`/api/notifications/${notificationId}/read`)
  },

  async markAllAsRead(): Promise<void> {
    await api.patch('/api/notifications/read-all')
  },

  async deleteNotification(notificationId: string): Promise<void> {
    await api.delete(`/api/notifications/${notificationId}`)
  },

  async deleteReadNotifications(): Promise<void> {
    await api.delete('/api/notifications/read')
  },
}
