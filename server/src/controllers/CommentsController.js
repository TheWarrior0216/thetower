import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";

export class CommentsController extends BaseController {
  constructor() {
    super('api/comments')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createComment)
      .delete('/:commentId', this.decimateComment)
  }

  async createComment(requset, response, next) {
    try {
      const user = requset.userInfo
      const commentData = requset.body
      commentData.creatorId = user.id
      const comment = await commentsService.createComment(commentData)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

  async decimateComment(request, response, next) {
    try {
      const commentId = request.params.commentId
      const userId = request.userInfo.id
      const comment = await commentsService.decimateComment(commentId, userId)
      response.send(comment)
    } catch (error) {
      next(error)
    }
  }

}