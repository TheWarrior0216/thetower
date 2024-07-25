import auth0provider from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { Auth0Provider } from "@bcwdev/auth0provider/lib/Auth0Provider.js";
import { theEventsService } from "../services/TheEventsService.js";
import { logger } from "../utils/Logger.js";
import { ticketsService } from "../services/TicketsService.js";


export class TheEventsController extends BaseController {
  constructor() {
    super('api/events')
    this.router
      .get('', this.getAllTheEvents)
      .get('/:eventId', this.getTheEventById)
      .get('/:eventId/tickets', this.getTheTicketsByEvent)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .put('/:eventId', this.editTheEventById)
      .post('', this.createTheEvent)
      .delete('/:eventId', this.decimateTheEventById)
  }
  async createTheEvent(request, response, next) {
    try {
      const user = request.userInfo
      const eventData = request.body
      eventData.creatorId = user.id
      const theEvent = await theEventsService.createTheEvent(eventData)
      response.send(theEvent)
    } catch (error) {
      next(error)
    }
  }

  async getAllTheEvents(request, response, next) {
    try {
      const TheEvents = await theEventsService.getAllTheEvents()
      response.send(TheEvents)
    } catch (error) {
      next(error)
    }
  }

  async getTheEventById(request, response, next) {
    try {
      const eventId = request.params.eventId

      const TheEvent = await theEventsService.getTheEventById(eventId)
      response.send(TheEvent)

    } catch (error) {
      next(error)
    }
  }
  async getTheTicketsByEvent(request, response, next) {
    try {
      const eventId = request.params.eventId

      const TheEvent = await ticketsService.getTheTicketsByEvent(eventId)
      response.send(TheEvent)

    } catch (error) {
      next(error)
    }
  }

  async editTheEventById(request, response, next) {
    try {
      const userId = request.userInfo.id
      const theEventData = request.body
      const eventId = request.params.eventId
      const theEvent = await theEventsService.editTheEventById(eventId, theEventData, userId)
      response.send(theEvent)
    } catch (error) {
      next(error)
    }
  }

  async decimateTheEventById(request, response, next) {
    try {
      const userId = request.userInfo.id
      const eventId = request.params.eventId
      const message = await theEventsService.decimateTheEventById(userId, eventId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
}