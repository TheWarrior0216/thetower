<script setup>
import { computed } from "vue";
import { theComment } from "../models/Comment.js";
import { AppState } from "../AppState.js";
import { commentsService } from "../services/CommentsService.js";
import Pop from "../utils/Pop.js";

defineProps({commentProp: theComment})
const account = computed(()=> AppState.account)
// const account = computed(()=> AppState.account)

async function decimateComment(commentId){
  try {

    await commentsService.decimateComment(commentId)
  }
  catch (error){
    Pop.error(error);
  }
}

</script>


<template>
<div class=" row bg-dark rounded p-2 m-3 border ">
  <div class="col-2 text-center">
    <img class="pfp" :src="commentProp.creator.picture" :alt="commentProp.creator.name">
  </div>
  <div class="col-9 border-start ">
    <h4>{{ commentProp.creator.name }}</h4>
    <p>{{ commentProp.body }}</p>
  </div>
<div v-if="account.id == commentProp.creator.id" class="col-1 ">
    <button @click="decimateComment(commentProp.id)" class="btn btn-danger mdi mdi-close-outline fs-1"></button>
  </div>
</div>

</template>


<style lang="scss" scoped>
.pfp{
  height: 10dvh;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>