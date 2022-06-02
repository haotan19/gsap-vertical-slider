<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { gsap } from "gsap";
import { SlideData } from "../types";

const props = defineProps<{
  pos: number;
  idx: number;
  slideData: SlideData;
}>();

const cardEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);

const handlePositionUpdate = (newPos: number, oldPos: number) => {
  if (oldPos === 2 || oldPos === -2) {
    if (newPos === 2 || newPos === -2) {
      // TODO: Use the old position to trigger the unique animation between -2 <-> 2
      // console.log("TRIGGER SPECIAL");
    }
  }
  gsap.to(cardEl.value, {
    x: 300 * newPos,
  });

  if(newPos === 0 && contentEl && contentEl.value) {
    const characters = contentEl.value.querySelectorAll("h1 span")
    gsap.to(characters, {
      y: 100
    })
  }
};

watch(() => props.pos, handlePositionUpdate);

const handleMouseOverEffect = (event: PointerEvent) => {
  const rect = cardEl.value?.getBoundingClientRect();
  if (rect) {
    const horizontalPercentage =
      ((event.clientX - (rect.right + rect.left) / 2) / rect.width) * 100 * 2;
    const verticalPercentage =
      (((rect.bottom + rect.top) / 2 - event.clientY) / rect.height) * 100 * 2;

    // IMPROVEMENT:  consider using gsap.set() or gsap.quickSetter()
    //     because it can deliver even better performance.
    gsap.to(cardEl.value, {
      rotateX: (5 * verticalPercentage) / 100,
      rotateY: (4 * horizontalPercentage) / 100,
    });
    gsap.to(contentEl.value, {
      rotateX: (5 * verticalPercentage) / 100,
      rotateY: (4 * horizontalPercentage) / 100,
      translateZ: 100,
    });
  }
};
const resetMouseOverEffect = (event: PointerEvent) => {
  gsap.to(cardEl.value, {
    rotateX: 0,
    rotateY: 0,
  });
  gsap.to(contentEl.value, {
    rotateX: 0,
    rotateY: 0,
    translateZ: 0,
  });
};

// TODO: Future text animation
const getHeadingHTML = () => 
  "<span>" + props.slideData.heading?.split("").join("</span><span>") + "</span>"

// TODO: 1. Find a set of vertical product ot display...
// TODO: 2. Find the font
</script>

<template>
  <!-- if POS is 0, set it to screen center -->
  <div class="slide-outer">
    <div
      ref="cardEl"
      class="absolute-center w-[300px] h-[500px] bg-slate-300"
      @pointermove="handleMouseOverEffect"
      @pointerleave="resetMouseOverEffect"
    ></div>
    <div ref="contentEl" class="absolute-center pointer-events-none">
      <h1 class="text-5xl" v-html="getHeadingHTML()"></h1>
    </div>
  </div>
</template>

<style>
.slide-outer {
  perspective: 1000px;
  height: 100vh;
  width: 100vw;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
}
.absolute-center {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
}
</style>
