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
const fgEl = ref<HTMLElement | null>(null);

const handlePositionUpdate = (newPos: number, oldPos: number) => {
  if (cardEl.value) {
    if ((oldPos === 2 && newPos === -2) || (oldPos === -2 && newPos === 2)) {
      gsap.to(cardEl.value, {
        x: 400 * newPos,
        z: -120 - 10 * 2,
        rotateY: -20 * newPos,
        onStart: () => {
          if (cardEl.value) cardEl.value.style.zIndex = "-20";
        },
        onComplete: () => {
          if (cardEl.value) cardEl.value.style.zIndex = "0";
        },
      });
    } else {
      gsap.to(cardEl.value, {
        x: 400 * newPos,
        z: newPos === 0 ? 0 : -120 - 10 * Math.abs(newPos),
        rotateY: -20 * newPos,
        filter:
          newPos === 0
            ? "grayscale(0) brightness(1)"
            : "grayscale(100) brightness(.5)",
      });
    }
  }

  if (newPos === 0 && contentEl && contentEl.value) {
    const characters = contentEl.value.querySelectorAll("h1 span");
    gsap.to(characters, {
      y: 100,
    });
  }
};

watch(() => props.pos, handlePositionUpdate);

onMounted(() => {
  if (cardEl) {
    gsap.to(cardEl.value, {
      x: 400 * props.pos,
      z: props.pos === 0 ? 0 : -120,
      rotateY: -20 * props.pos,
      filter:
        props.pos === 0
          ? "grayscale(0) brightness(1)"
          : "grayscale(100) brightness(.5)",
    });
  }
});

const handleMouseOverEffect = (event: PointerEvent) => {
  const rect = cardEl.value?.getBoundingClientRect();
  if (props.pos === 0 && rect) {
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
    gsap.to(fgEl.value, {
      rotateX: (7 * verticalPercentage) / 100,
      rotateY: (7 * horizontalPercentage) / 100,
      translateZ: 25,
    });
  }
};
const resetMouseOverEffect = (event: PointerEvent) => {
  if (props.pos === 0) {
    gsap.to(cardEl.value, {
      rotateX: 0,
      rotateY: 0,
    });
    gsap.to(contentEl.value, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
    });
    gsap.to(fgEl.value, {
      rotateX: 0,
      rotateY: 0,
      translateZ: 0,
    });
  }
};

// TODO: Future text animation
const getHeadingHTML = () =>
  "<span>" +
  props.slideData.heading?.split("").join("</span><span>") +
  "</span>";

// TODO: 1. Find a set of vertical product ot display...
// TODO: 2. Find the font

const getImgUrl = ({ imgType = "bg" }: { imgType?: "fg" | "bg" } = {}) => {
  if (props.slideData.img && imgType === "bg")
    return new URL(props.slideData.img, import.meta.url).href;
  else if (props.slideData.imgFg)
    return new URL(props.slideData.imgFg, import.meta.url).href;
};
</script>

<template>
  <div
    ref="cardEl"
    class="absolute-center w-[300px] h-[450px] bg-slate-300 slide-inner"
    @pointermove="handleMouseOverEffect"
    @pointerleave="resetMouseOverEffect"
  >
    <img :src="getImgUrl()" :alt="slideData.heading" />
    <img
      v-if="getImgUrl({ imgType: 'fg' })"
      ref="fgEl"
      class="absolute top-0"
      :src="getImgUrl({ imgType: 'fg' })"
      :alt="slideData.heading"
      style="transform-origin: top center 25px"
    />
  </div>
  <div
    ref="contentEl"
    v-if="pos === 0"
    class="absolute left-1/2 bottom-48 -translate-x-1/2 pointer-events-none z-10"
  >
    <h1
      class="text-5xl text-white uppercase font-bold tracking-wider"
      v-html="getHeadingHTML()"
    ></h1>
  </div>
</template>

<style>
.absolute-center {
  @apply absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2;
}
.slide-inner {
  perspective: 1000px;
}
</style>
