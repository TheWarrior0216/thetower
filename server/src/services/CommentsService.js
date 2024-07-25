import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"

class CommentsSErvice {

  async getTheEventComments(eventId) {
    const comment = await dbContext.Comments.find({ eventId }).populate('creator')
    return comment
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate('creator')
    return comment
  }
  async decimateComment(commentId, userId) {
    const comment = await dbContext.Comments.findById(commentId)
    if (comment.creatorId != userId) throw new Forbidden('How Dare You')
    await comment.deleteOne()
    return `What Comment`
  }

}
export const commentsService = new CommentsSErvice()