import { dbContext } from "../db/DbContext.js"

class TicketsService {
  async createPost(postData) {
    const response = await dbContext.Tickets.create(postData)
    await response.populate('profile')
    return response
  }

}
export const ticketsService = new TicketsService()