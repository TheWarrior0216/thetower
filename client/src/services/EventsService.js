import { AppState } from "../AppState.js"
import { TheEvent } from "../models/TheEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async cancelEvent(eventId) {
    await api.delete(`api/events/${eventId}`)
  }
  async getTheEvent(eventId) {
    AppState.obtainedEvent = null
    const response = await api.get(`api/events/${eventId}`)
    const newEvent = new TheEvent(response.data)
    AppState.obtainedEvent = newEvent
  }
  async submitTheEvent(editableEventData) {

    const response = await api.post('api/events', editableEventData)
    const newEvent = new TheEvent(response.data)
    AppState.theEvents.push(newEvent)
    AppState.obtainedEvent = newEvent
  }
  async getEvents() {
    const response = await api.get('/api/events')
    logger.log(response.data)
    const newEvents = response.data.map(Pojo => new TheEvent(Pojo))
    AppState.theEvents = newEvents
  }


}
export const eventsService = new EventsService()