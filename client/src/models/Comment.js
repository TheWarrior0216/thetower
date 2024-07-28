export class theComment {
  constructor(data) {
    this.id = data.id
    this.creatorId = data.createId
    this.eventId = data.eventId
    this.body = data.body
    this.creator = data.creator
  }
}