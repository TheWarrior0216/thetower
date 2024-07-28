<script setup>
import { TheEvent } from "../models/TheEvent.js";

defineProps({theEvent: TheEvent})
</script>


<template>
  <RouterLink :to="{name: 'TheEventDetails', params: {eventId: theEvent.id}}">
    <div v-if="!theEvent.isCanceled">
      <section  class="card justify-content-end selectable" :style="{backgroundImage: `url(${theEvent?.coverImg})`}">
        <div>
          <div class="card-body textStyle">
            <h4 class="card-title">{{ theEvent.name }}</h4>
            <p class="card-text">{{theEvent.startDate.toLocaleString()}}</p>
          </div>
        </div>
      </section>
    </div>
    <div v-else>
  
    </div>
  </RouterLink>
</template>


<style lang="scss" scoped>
.card{
height: 33vh;
background-image: v-bind('theEvent.coverImg');
background-size: cover;
background-position: center;
}
.textStyle{
  text-shadow: 3px 1px black;
}
.grayscale{
  background-image: url('https://th.bing.com/th/id/OIP.Be21_nRXRXMjt-eI4jUNMwAAAA?rs=1&pid=ImgDetMain');
}
</style>