<script setup>
import { TheEvent } from "../models/TheEvent.js";

defineProps({theEvent: TheEvent})
</script>


<template>
  <!-- TODO add rputer link to navigate to event details page -->
  <div>

    <section class="card justify-content-end selectable" :style="{backgroundImage: `url(${theEvent?.coverImg})`}" >
      <div>

    <div class="card-body textStyle">
      <h4 class="card-title">{{ theEvent.name }}</h4>
      <p class="card-text">{{theEvent.startDate.toLocaleString()}}</p>
    </div>
  </div>
</section>
</div>

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
</style>