<script setup>
import { ref } from "vue";
import Pop from "../utils/Pop.js";
import { eventsService } from "../services/EventsService.js";

const categories = ['All','Concert', 'Convention','Sport','Digital' ]


const editableEventData = ref({
  name: '',
  location: '',
  type: '',
  startDate: '',
  capacity: '',
  coverImg: '',
  description: '',
})

async function submitTheEvent(){
  try {
  await eventsService.submitTheEvent(editableEventData.value)
  resetForm()
  }
  catch (error){
    Pop.error(error);
  }
}
function resetForm(){
editableEventData.value = {
name: '',
  location: '',
  type: '',
  startDate: '',
  capacity: '',
  coverImg: '',
  description: '',
  }
}
</script>


<template>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="modalTitle" aria-hidden="true">
  <div class="modal-dialog modal-xl">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="modalTitle">Create Your Event!</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form @submit.prevent="submitTheEvent()" class="row">
          <div class="col-6">
            <img v-if="editableEventData.coverImg" class="img-fluid" :src="editableEventData.coverImg" alt="Preview Here">
            <div v-else class="empty d-flex justify-content-center align-items-center" style="background-color: gray;">
<div>
  <h2 class="mdi mdi-image">Image Preview</h2>
</div>
            </div>
          </div>
          <div class="col-6">

            <div class="form-floating mb-3">
              <input v-model="editableEventData.name" type="text" class="form-control" id="modalText"
              placeholder="Name...">
            <label for="modalText">Name</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.location" type="text" class="form-control" id="modalLocation"
              placeholder="Location...">
            <label for="modalLocation">Location</label>
          </div>
          <div class="form-floating">
            <select v-model="editableEventData.type" class="form-select mb-3" id="floatingSelect"
              aria-label="Floating label select example">
              <option disabled>Choose A category</option>
              <option v-for="category in categories" :key="category" :value=" category ">{{category}}</option>
            </select>
            <label for="floatingSelect">Category</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.startDate" type="date" class="form-control" id="modalDate">
            <label for="modalDate">Start Date</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.capacity" type="number" class="form-control" id="modalNumber"
              placeholder="0">
            <label for="modalNumber">Capacity</label>
          </div>
          <div class="form-floating mb-3">
            <input v-model="editableEventData.coverImg" type="url" class="form-control" id="modalUrl" placeholder="0">
            <label for="modalUrl">ImageUrl</label>
          </div>
        </div>
          <div class="form-floating mb-3">
            <textarea v-model="editableEventData.description" class="form-control"
            placeholder="Leave a Description here" id="floatingTextarea"></textarea>
            <label for="floatingTextarea">Description </label>
          </div>
          <button type="submit" data-bs-dismiss="modal" class="btn btn-primary">Submit Event</button>
        </form>
      </div>
    </div>
  </div>
</div>
</template>


<style lang="scss" scoped>
.empty{
  height: 59dvh;
}
</style>