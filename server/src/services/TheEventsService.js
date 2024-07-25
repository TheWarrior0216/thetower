import { dbContext } from "../db/DbContext.js"
import { logger } from "../utils/Logger.js"

class TheEventsService {
  async decimateTheEventById(userId, eventId) {
    const theEvent = await this.checkAuthorization(eventId, userId)
    theEvent.isCanceled = true
    theEvent.save()
    return `You have Succesfully decimated ${theEvent.name}`
  }
  async editTheEventById(eventId, theEventData, userId) {
    const theEvent = await this.checkAuthorization(eventId, userId)
    theEvent.name = theEventData.name
    theEvent.description = theEventData.description
    theEvent.save()
    return theEvent
  }
  async getTheEventById(eventID) {
    const theEvent = await dbContext.TheEvents.findById(eventID).populate('creator')
    return theEvent
  }
  async getAllTheEvents() {
    const theEvent = await dbContext.TheEvents.find().populate('creator')
    return (theEvent)
  }
  async createTheEvent(eventData) {
    const theEvent = await dbContext.TheEvents.create(eventData)
    await theEvent.populate('creator')
    return theEvent
  }

  async checkAuthorization(eventId, userId) {
    const theEvent = await dbContext.TheEvents.findById(eventId)
    if (theEvent.creatorId != userId) return
    return theEvent
  }

}
export const theEventsService = new TheEventsService()