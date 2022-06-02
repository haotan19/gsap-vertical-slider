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
  value: [-2, -1, 0, 1, 2],
});

const handleNextSlideTransition = () => {
  slidesPositions.value = slidesPositions.value.map((num) => {
    if (num < 2) {
      return num + 1;
    } else return -2;
  });
};

onMounted(() => {
  // gsap.fromTo
});
</script>

<template>
  <div class="slider-container">
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
  <button class="absolute right-0" @click="handleNextSlideTransition">
    NEXT
  </button>
</template>

<style>
.slider-container {
  perspective: 500px;
}
</style>
