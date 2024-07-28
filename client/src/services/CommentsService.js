import { AppState } from "../AppState.js"
import { theComment } from "../models/Comment.js"
import { api } from "./AxiosService.js"

class CommentsService {
  async decimateComment(commentId) {
    const index = AppState.comments.findIndex(comment => comment.id == commentId)
    await api.delete(`api/comments/${commentId}`)
    AppState.comments.splice(index, 1)
  }
  async getComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    const newComments = response.data.map(pojo => new theComment(pojo))
    AppState.comments = newComments
  }
  async createComment(value) {
    const response = await api.post('api/comments', value)
    const newPost = new theComment(response.data)
    AppState.comments.push(newPost)
  }

}
export const commentsService = new CommentsService()