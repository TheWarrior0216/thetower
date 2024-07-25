import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TheEventSchema } from "../models/TheEvent.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);

  TheEvents = mongoose.model('TheEvent', TheEventSchema)
}

export const dbContext = new DbContext()
