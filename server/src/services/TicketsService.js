import { dbContext } from "../db/DbContext.js"

class TicketsService {
  async decimateTicket(userId, ticketId) {
    const ticket = await dbContext.Tickets.findById(ticketId)
    if (ticket.accountId != userId) return
    await ticket.deleteOne()
    return 'You Decimated A ticket'
  }
  async getTheTicketsByEvent(eventId) {
    if (!eventId) return
    const tickets = await dbContext.Tickets.find({ eventId }).populate('profile')
    return tickets
  }
  async getTicketsById(accountId) {
    if (!accountId) return
    const tickets = await dbContext.Tickets.find({ accountId }).populate('event')
    return tickets
  }

  async createPost(postData) {
    const response = await dbContext.Tickets.create(postData)
    await response.populate('profile event')
    return response
  }

}
export const ticketsService = new TicketsService()