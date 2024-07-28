import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class TicketsService {

  async destroyTicket(ticketId) {
    const index = AppState.profileTickets.findIndex(ticket => ticket.id = ticketId)
    await api.delete(`api/tickets/${ticketId}`)
    AppState.profileTickets.splice(index, 1)
    AppState.obtainedEvent.ticketCount--
  }
  async grabTicket(eventId) {
    const response = await api.post(`api/tickets`, eventId)
    const newTicket = new Ticket(response.data)
    AppState.profileTickets.push(newTicket)
    AppState.obtainedEvent.ticketCount++
  }
  async grabAllTicketsForEvent(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    const tickets = response.data.map(pojo => new Ticket(pojo))
    AppState.profileTickets = tickets
  }
}
export const ticketsService = new TicketsService()