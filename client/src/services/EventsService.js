import { AppState } from "../AppState.js"
import { TheEvent } from "../models/TheEvent.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class EventsService {
  async getEvents() {
    const response = await api.get('/api/events')
    logger.log(response.data)
    const newEvents = response.data.map(Pojo => new TheEvent(Pojo))
    AppState.theEvents = newEvents
  }


}
export const eventsService = new EventsService()