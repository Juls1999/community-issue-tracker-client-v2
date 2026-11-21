import type { IssueComment } from '@/types'
import api from './axios'
import axios from 'axios'

export const issueDiscussionService = {
  async getComments(issueUuid: string): Promise<IssueComment[]> {
    const { data } = await api.get<{ data: IssueComment[] }>(`/api/issues/${issueUuid}/comments`)

    return data.data
  },

  async addComment(issueUuid: string, body: string) {
    const response = await api.post(`/api/issues/${issueUuid}/comments`, { body })

    return response.data
  },

  async getAttachments(issueUuid: string) {
    const response = await api.get(`/api/issues/${issueUuid}/attachments`)

    return response.data
  },

  async uploadAttachment(issueUuid: string, files: File[]) {
    const formData = new FormData()

    files.forEach((file) => {
      formData.append('images[]', file, file.name)
    })

    return api.post(`/api/issues/${issueUuid}/attachments`, formData, {
      transformRequest: [(data) => data],
      headers: {
        'Content-Type': undefined,
      },
    })
  },

  getDownloadUrl(issueUuid: string, attachmentId: number) {
    return `/api/issues/${issueUuid}/attachments/${attachmentId}/download`
  },

  async downloadAttachment(issueUuid: string, attachmentId: number) {
    const response = await api.get(
      `/api/issues/${issueUuid}/attachments/${attachmentId}/download`,
      {
        responseType: 'blob',
      },
    )

    return response.data
  },

  // getDownloadUrl(issueUuid: string, attachmentId: number) {
  //   return (
  //     `${axios.defaults.baseURL ?? ''}` +
  //     `/api/issues/${issueUuid}/attachments/${attachmentId}/download`
  //   )
  // },
}
