import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { ticketsService } from "../services/TicketsService.js";

export class TicketsController extends BaseController {
  constructor() {
    super('/api/tickets')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post('', this.createPost)
      .delete('/:ticketId', this.decimateTicket)

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
  async decimateTicket(request, response, next) {
    try {
      const userId = request.userInfo.id
      const ticketId = request.params.ticketId
      const ticket = await ticketsService.decimateTicket(userId, ticketId)
      response.send(ticket)
    } catch (error) {
      next(error)
    }
  }
}
