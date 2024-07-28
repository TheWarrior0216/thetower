<script setup>
import { computed, onMounted } from "vue";
import { AppState } from "../AppState.js";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";
import { useRoute } from "vue-router";
import { ticketsService } from "../services/TicketsService.js";

const route = useRoute()


const theEvent = computed(()=> AppState.obtainedEvent)
const tickets = computed(()=> AppState.profileTickets)

onMounted(()=>{
  getTheEvent()
  grabAllTicketsForEvent()
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
</script>


<template>
<div v-if="theEvent" class="container">
  <div class="row">
    <div class="col-12 my-5 d-flex justify-content-center img-fix rounded"
      :style="{backgroundImage: `url(${theEvent.coverImg})`}">
    </div>
    <div class="col-12 mt-5">
      <div class="row">
        <div class="col-md-9">
          <h1>{{ theEvent.name }}: <span class="fs-6 bg-info text-dark rounded py-2 px-1 ms-5">{{ theEvent.type }}</span></h1>
          <h3 class="my-3">Description:</h3>
          <p>{{ theEvent.description }}</p>
          <h2 class="fw-light mdi mdi-calendar-clock-outline my-3"> Date and Time:</h2>
          <p class="fw-bold"> This event begins {{ theEvent.startDate.toLocaleString() }}</p>
          <h2 class="fw-light mdi mdi-map-marker my-3"> Location:</h2>
          <p class="fw-bold"> This event is at {{ theEvent.location }}</p>
        </div>
        <div class="col-md-3">
<div class="bg-info mt-5 text-dark p-2 rounded">
  <div class="text-center">
    <h3>Intrested in going?</h3>
    <p>Grab A Ticket!!</p>
    <button @click="grabTicket()" class="btn btn-dark">Click Here!</button>
  </div>
  <div v-if="" class="text-end mt-3">
   <h5> Tickets Left: {{ theEvent.capacity - theEvent.ticketCount  }} </h5>
  </div>
</div>
<div  class="bg-info mt-5 text-dark p-2 rounded">
  <h2 v-for="ticket in tickets" :key="ticket.id"><span> <img class="pfp" :src="ticket.profile.picture" :alt="ticket.profile.name"></span> {{ticket.profile.name}}</h2>
</div>
        </div>
      </div>
    </div>
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
  height: 10dvh;
  border-radius: 50%;
  aspect-ratio: 1/1;
}
</style>