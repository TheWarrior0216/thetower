<script setup>
import { computed, onMounted, ref } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
import { ticketsService } from "../services/TicketsService.js";
import { commentsService } from "../services/CommentsService.js";

const route = useRoute()


const theEvent = computed(()=> AppState.obtainedEvent)
const tickets = computed(()=> AppState.profileTickets)
const account = computed(()=> AppState.account)
const theComments = computed(()=> AppState.comments)

onMounted(()=>{
  getTheEvent()
  grabAllTicketsForEvent()
  getComments()
})

const editableData = ref({
  body: '',
  eventId: route.params.eventId
})

async function getTheEvent(){
  try {
    const eventId = route.params.eventId
    await eventsService.getTheEvent(eventId)
  }
  catch (error){
    Pop.error(error);
  }
}
async function cancelEvent(eventId){
  try {
    await eventsService.cancelEvent(eventId)
  }
  catch (error){
    Pop.error(error);
  }
}
async function grabAllTicketsForEvent(){
try {
  await ticketsService.grabAllTicketsForEvent(route.params.eventId)
}
catch (error){
  Pop.error(error);
}
}
async function grabTicket(){
  try {
    const eventId = {eventId: route.params.eventId}
    await ticketsService.grabTicket(eventId )
  }
  catch (error){
    Pop.error(error);
  }
}
async function destroyTicket(){
  try {
    const ticketId = AppState.profileTickets.find(ticket => ticket.accountId == account.value.id)
    await ticketsService.destroyTicket(ticketId.id )
  }
  catch (error){
    Pop.error(error);
  }
}
async function getComments(){
  try {
    await commentsService.getComments(route.params.eventId)
  }
  catch (error){
    Pop.error(error);
  }
}
async function createComment(){
  try {
    await commentsService.createComment(editableData.value)
  }
  catch (error){
    Pop.error(error);
  }
}
</script>


<template>
  <div v-if="theEvent?.isCanceled" class="text-center">
<h1 class="text-danger">THE EVENT HAS BEEN CANCELED</h1>  </div>
<div v-else-if="theEvent" class="container">
  <div class="row">
    <div class="col-12 my-5 d-flex justify-content-center img-fix rounded"
      :style="{backgroundImage: `url(${theEvent.coverImg})`}">
    </div>
    <div class="col-12 mt-5">
      <div class="row">
        <div class="col-md-9">
          <div>

            <h1>{{ theEvent.name }}: <span
              class="fs-6 bg-info text-dark rounded py-2 px-1 ms-5">{{ theEvent.type }}</span></h1>
              <h3 class="my-3">Description:</h3>
          <p>{{ theEvent.description }}</p>
          <h2 class="fw-light mdi mdi-calendar-clock-outline my-3"> Date and Time:</h2>
          <p class="fw-bold"> This event begins {{ theEvent.startDate.toLocaleString() }}</p>
          <h2 class="fw-light mdi mdi-map-marker my-3"> Location:</h2>
          <p class="fw-bold"> This event is at {{ theEvent.location }}</p>
        </div>
        <h5 class="mt-5">See What Everyone Has To Say...</h5>
        <div class="bg-info">
          <div class="text-end">
<form v-if="account" @submit.prevent="createComment()">
  <div class="form-floating">
  <textarea  v-model="editableData.body" class="form-control" placeholder="Leave a comment here" id="Comments" style="height: 100px"></textarea>
  <label for="Comments">Comments</label>
  <button type="submit" class="btn btn-dark">Submit Comment</button>
</div>
</form>
          </div>
          <div v-if="account">
            <div  class="pt-2" v-for="comment in theComments" :key="comment.id">
              <CommentSection :commentProp ="comment"/>
            </div>
          </div>
        </div>
        </div>
        <div class="col-md-3">
          <div class="bg-info mt-5 text-dark p-2 rounded">
            <div class="text-center">
              <h5  v-if="tickets.find((ticket)=> ticket.accountId == account?.id || theEvent.isCanceled)">You Are Attending This Event
                <button @click="destroyTicket()" class="btn btn-dark mt-2">Unattend</button>
              </h5>
              <div v-else>
                <div v-if="account">
                  <h3>Intrested in going?</h3>
                  <p>Grab A Ticket!!</p>
                  <button @click="grabTicket()" class="btn btn-dark"
                :class="{disabled:(theEvent.capacity - theEvent.ticketCount) <= 0|| theEvent.isCanceled} ">Click Here!</button>
                </div>
                <div v-else-if=" theEvent.isCanceled">
                  <h3>Intrested in going?</h3>
                  <p>Login to Grab A Ticket!!</p>
                </div>
                
              </div>
              <div>
                <button v-if="(theEvent.capacity - theEvent.ticketCount) <= 0" class="btn btn-danger"
                  :class="{disabled:(theEvent.capacity - theEvent.ticketCount) <= 0} ">Out of Room</button>
              </div>
            </div>
            <div v-if=" (theEvent.capacity - theEvent.ticketCount) > 0 " class="text-end mt-3">
              <h5> Tickets Left: {{ theEvent.capacity - theEvent.ticketCount  }} </h5>
            </div>
          </div>
          <div class="bg-info mt-5 text-dark p-2 rounded">
            <h3>People Going:</h3>
            <h5 v-for="ticket in tickets" :key="ticket.id"><span> <img class="pfp" :src="ticket.profile.picture"
                  :alt="ticket.profile.name"></span> {{ticket.profile.name}}</h5>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="account?.id == theEvent.creatorId" class="text-center">
<button @click="cancelEvent(theEvent.id)" class="btn btn-danger">
Cancel Event
</button>
  </div>
</div>

</template>


<style lang="scss" scoped>
.img-fix{
  height: 40dvh;
 width: 100%;
 background-position: center;
 object-fit: contain;
 filter: unset;
 
}
.pfp{
  height: 7dvh;
  border-radius: 50%;
  aspect-ratio: 1/1;
}
</style>