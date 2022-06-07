<script setup lang="ts">
import Slide from "./components/slide.vue";
import { gsap } from "gsap";
import { onMounted, reactive } from "vue";
import { SlideData } from "./types";
import MouseFollower from "./components/mouseFollower.vue";

const slideData: SlideData[] = [
  {
    id: 1,
    heading: "Step out to the edge",
    img: "../assets/skateboard-1-unsplash-jan-Kopriva-bg.png",
    imgFg: "../assets/skateboard-1-unsplash-jan-Kopriva-fg.png",
  },
  {
    id: 2,
    heading: "Step out to the edge",
    img: "../assets/s2-bg-unsplash.png",
    imgFg: "../assets/s2-fg-unsplash.png"
  },
  {
    id: 3,
    heading: "Step out to the edge",
    img: "../assets/sk-3-bg.png",
    imgFg: "../assets/sk-3-fg.png",
  },
  {
    id: 4,
    img: "../assets/s4-bg.png",
    imgFg: "../assets/s4-fg.png",
  },
  {
    id: 5,
    img: "../assets/s5-bg.png",
    imgFg: "../assets/s5-fg.png",
  },
];

const slidesPositions = reactive({
  value: [-2, -1, 0, 1, 2],
});

const handleNextSlideTransition = () => {
  slidesPositions.value = slidesPositions.value.map((num) =>
    num > -2 ? num - 1 : 2
  );
};
const handlePreviousSlideTransition = () => {
  slidesPositions.value = slidesPositions.value.map((num) =>
    num < 2 ? num + 1 : -2
  );
};

onMounted(() => {
  // gsap.fromTo
});
</script>

<template>
  <div class="relative overflow-hidden w-screen h-screen perspective">
    <Slide
      v-for="(d, idx) in slideData"
      :idx="idx"
      :pos="slidesPositions.value[idx]"
      :slide-data="d"
    ></Slide>
  </div>
  <button
    class="absolute left-4 top-1/2 p-8"
    @click="handlePreviousSlideTransition"
  >
    Prev
  </button>
  <button
    class="absolute right-4 top-1/2 p-8"
    @click="handleNextSlideTransition"
  >
    NEXT
  </button>
  <MouseFollower></MouseFollower>
</template>

<style>
body {
  background-color: gray;
}
.perspective {
  perspective: 1000px;
}
</style>
