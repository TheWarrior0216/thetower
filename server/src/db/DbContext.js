import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TheEventSchema } from "../models/TheEvent.js";
import { TicketSchema } from "../models/Ticket.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TheEvents = mongoose.model('TheEvent', TheEventSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
}

export const dbContext = new DbContext()
