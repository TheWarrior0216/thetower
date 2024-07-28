<script setup>
import { computed, onMounted, ref } from "vue";
import { eventsService } from "../services/EventsService.js";
import Pop from "../utils/Pop.js";
import EventCard from "../components/EventCard.vue";
import { AppState } from "../AppState.js";

onMounted(()=>{
  getEvents()
  AppState.obtainedEvent = null
})
async function getEvents(){
  try {
    await eventsService.getEvents()
  }
  catch (error){
    Pop.error(error);
  }
}

const categoryFilter = ref('All')
const categories = ['All','Concert', 'Convention','Sport','Digital' ]
const theEvents = computed(()=> {
  if(categoryFilter.value == 'All'){
    return AppState.theEvents
  }
  return AppState.theEvents.filter(album => album.type == categoryFilter.value)
})
</script>

<template>
 <div class="container-fluid  shadow border">
  <div class="row backgroundImage">
<div class="col-12 textStyle img-positions">
  <h2  > Welcome to The Eve Connection Center</h2>
    <p> <span class="bg-dark p-2 rounded">Here you can find your connections to not only where the events are, but the time, place, and find out who wlse is going.  </span></p>
</div>
  </div>
 </div>
 <div class="container">
  <div class="row justify-content-around">
    <div class="col-12">
      <h2 class="m-4 mt-5 ">How Eve Works</h2>
    </div>
    <div class="col-md-5 p-3 pt-1 border">
<h3 class="mdi mdi-magnify "> Discover Events your intrested in</h3>
<p class="ps-3 fw-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi placeat et sequi doloremque voluptas praesentium nesciunt fugit architecto eum!</p>
    </div>
    <div class="col-md-5 p-3 pt-1 border">
<h3 class="mdi mdi-plus "> Create Events of your own</h3>
<p class="ps-3 fw-light">Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae eligendi placeat et sequi doloremque voluptas praesentium nesciunt fugit architecto eum!</p>
<!-- TODO have this open a modal with your form in it -->
 <!-- TODO reference createAlbum method for router push -->
<p data-bs-toggle="modal" data-bs-target="#exampleModal" class="text-success mdi mdi-plus selectable"> Create Here</p>
    </div>
    <div class="col-12">
      <h2 class="m-4 mt-5 ">Explore Categories</h2>
    </div>
    <div class="text-center d-flex flex-direction-row justify-content-around">
    <div  v-for="category in categories" :key="category" @click="categoryFilter = category" class="col-md-2 p-3 pt-1 border selectable">

        <h3  class="mdi mdi-magnify "></h3>
        <h6>{{category}}</h6>
      </div>
    
</div>
     <div class="col-12">
      <h2 class="m-4 mt-5 ">Upcoming Events</h2>
      <div class="row">

        <div v-for="theEvent in theEvents" :key="theEvent.id" class="col-4 g-4">
          <EventCard v-if="theEvent" :theEvent ="theEvent"/>
        </div>
      </div>
    </div>
    
  </div>
 </div>
</template>

<style scoped lang="scss">
.backgroundImage{
  // FIXME makes sure this looks good on mobile
  background-image: url('https://1.bp.blogspot.com/-4vf9OVikxC8/XFUltIbso7I/AAAAAAAABz0/JVXPiIhLnbA3tfwA29H1pqJlbXvX39fEwCKgBGAs/w0/snow-mountainer-night-sky-stars-scenery-31-4K.jpg');
  height: 60dvh;
  background-position: center bottom -150px;
  background-size: cover;

}
.img-positions{
  margin-top: 35dvh;
  
  // margin-right: 0;
}
.textStyle{
  text-shadow: 3px 1px black;
}
</style>
