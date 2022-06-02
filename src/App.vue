<script setup lang="ts">
import Slide from "./components/slide.vue";
import { gsap } from "gsap";
import { onMounted, reactive } from "vue";

const slideData = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

const slidesPositions = reactive({
  value: [-2, -1, 0, 1, 2]
})

onMounted(() => {
  // gsap.fromTo
});
</script>

<template>
  <div class="">
    <Slide
      :key="slideData[0].id"
      :idx="0"
      :pos="slidesPositions.value[2]"
    ></Slide>
    <!-- <Slide
      v-for="(slide, idx) in slideData"
      :key="slide.id"
      :idx="idx"
      :pos="-Math.floor((slideData.length) / 2) + idx"
    ></Slide> -->
  </div>
  <button >Prev</button>
  <button class="absolute right-0">NEXT</button>
</template>

<style></style>
