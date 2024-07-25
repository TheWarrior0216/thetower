import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)

  }
  async createPost(request, response, next) {
    try {
      const user = request.userInfo
      const postData = request.body
      postData.accountId = user.id
      const ticket = await ticketsService.createPost(postData)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}
