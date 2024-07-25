import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TheEventSchema } from "../models/TheEvent.js";
import { TicketSchema } from "../models/Ticket.js";
import { CommentSchema } from "../models/Comment.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TheEvents = mongoose.model('TheEvent', TheEventSchema)
  Tickets = mongoose.model('Ticket', TicketSchema)
  Comments = mongoose.model('Comment', CommentSchema)
}

export const dbContext = new DbContext()
