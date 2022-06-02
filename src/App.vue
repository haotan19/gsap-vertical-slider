<script setup lang="ts">
import Slide from "./components/slide.vue";
import { gsap } from "gsap";
import { onMounted, reactive } from "vue";
import { SlideData } from "./types";

const slideData: SlideData[] = [
  {
    id: 1,
    heading: "Step out to the edge",
  },
  {
    id: 2,
    heading: "Step out to the edge",
  },
  {
    id: 3,
    heading: "Step out to the edge",
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

const handlePreviousSlideTransition = () => {
  slidesPositions.value = slidesPositions.value.map((num) =>
    num > -2 ? num - 1 : 2
  );
};
const handleNextSlideTransition = () => {
  slidesPositions.value = slidesPositions.value.map((num) =>
    num < 2 ? num + 1 : -2
  );
};

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
      :slide-data="slideData[2]"
    ></Slide>
    <!-- <Slide
      v-for="(slide, idx) in slideData"
      :key="slide.id"
      :idx="idx"
      :pos="-Math.floor((slideData.length) / 2) + idx"
    ></Slide> -->
  </div>
  <button class="absolute left-4 top-1/2 p-8" @click="handlePreviousSlideTransition">Prev</button>
  <button class="absolute right-4 top-1/2 p-8" @click="handleNextSlideTransition">
    NEXT
  </button>
</template>

<style></style>
