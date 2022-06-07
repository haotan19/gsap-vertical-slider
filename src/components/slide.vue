<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from "vue";
import { gsap } from "gsap";
import { SlideData } from "../types";

const SLIDE_SPACING = 340;

const props = defineProps<{
  pos: number;
  idx: number;
  slideData: SlideData;
}>();

const data = reactive({
  onPosTransition: false,
  rXTo: new Function(),
});

const cardEl = ref<HTMLElement | null>(null);
const contentEl = ref<HTMLElement | null>(null);
const fgEl = ref<HTMLElement | null>(null);

const handlePositionUpdate = (newPos: number, oldPos: number) => {
  if (cardEl.value) {
    if ((oldPos === 2 && newPos === -2) || (oldPos === -2 && newPos === 2)) {
      gsap.to(cardEl.value, {
        x: SLIDE_SPACING * newPos,
        z: -120 - 10 * 2,
        rotateY: -30 * newPos,
        onStart: () => {
          if (cardEl.value) cardEl.value.style.zIndex = "-20";
          data.onPosTransition = true;
        },
        onComplete: () => {
          if (cardEl.value) cardEl.value.style.zIndex = "0";
          data.onPosTransition = false;
        },
      });
    } else {
      gsap.to(cardEl.value, {
        x: SLIDE_SPACING * newPos,
        z: newPos === 0 ? 0 : -120 - 10 * Math.abs(newPos),
        rotateY: -30 * newPos,
        filter:
          newPos === 0
            ? "grayscale(0) brightness(1)"
            : "grayscale(100) brightness(.5)",
        onStart: () => {
          data.onPosTransition = true;
        },
        onComplete: () => {
          data.onPosTransition = false;
        },
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
  if (cardEl && cardEl.value) {
    gsap.to(cardEl.value, {
      x: SLIDE_SPACING * props.pos,
      z: props.pos === 0 ? 0 : -120,
      rotateY: -20 * props.pos,
      filter:
        props.pos === 0
          ? "grayscale(0) brightness(1)"
          : "grayscale(100) brightness(.5)",
      onStart: () => {
        if (cardEl.value) cardEl.value.style.zIndex = "0";
      },
    });

    let cardTo = gsap.quickSetter(cardEl.value, "css");

    let contentTo: Function | undefined;
    if (contentEl.value) contentTo = gsap.quickSetter(contentEl.value, "css");

    let fgTo : Function | undefined;
    if(fgEl.value) fgTo = gsap.quickSetter(fgEl.value, "css");

    cardEl.value.addEventListener("pointermove", (e) => {
      const result = handleMouseOverEffect(e);
      if (!result) return;

      cardTo({ rotateX: result.rotateX, rotateY: result.rotateY });
      if (contentTo)
        contentTo({
          rotateX: result.rotateX,
          rotateY: result.rotateY,
          z: 100, // TODO: need some curve on Z transform
        });

      const fgResult = handleMouseOverEffect(e, true);
      if (!fgResult) return;
      if(fgTo) 
        fgTo({
          rotateX: fgResult.rotateX,
          rotateY: fgResult.rotateY,
          z: 25, // TODO: need some curve on Z transform
        })
    });
  }
});

const handleMouseOverEffect = (event: PointerEvent, fg?: boolean) => {
  const rect = cardEl.value?.getBoundingClientRect();
  if (!data.onPosTransition && props.pos === 0 && rect) {
    const horizontalPercentage =
      ((event.clientX - (rect.right + rect.left) / 2) / rect.width) * 100 * 2;
    const verticalPercentage =
      (((rect.bottom + rect.top) / 2 - event.clientY) / rect.height) * 100 * 2;

    let rotateX = (5 * verticalPercentage) / 100;
    let rotateY = (4 * horizontalPercentage) / 100;
    if (fg) {
      rotateX = (7 * verticalPercentage) / 100;
      rotateY = (7 * horizontalPercentage) / 100;
    }

    return {
        rotateX,
        rotateY,
    };
  }
};
const resetMouseOverEffect = (event: PointerEvent) => {
  if (props.pos === 0) {
    if (cardEl.value)
      gsap.to(cardEl.value, {
        rotateX: 0,
        rotateY: 0,
      });
    if (contentEl.value)
      gsap.to(contentEl.value, {
        rotateX: 0,
        rotateY: 0,
        translateZ: 0,
      });
    if (fgEl.value)
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
    @pointerleave="resetMouseOverEffect"
  >
    <img
      class="w-full h-full object-cover"
      :src="getImgUrl()"
      :alt="slideData.heading"
    />
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
    v-if="pos === 0 && slideData.heading"
    class="absolute left-1/2 top-1/2 pointer-events-none z-10"
    style="transform: translateX(-55%) translateY(80%)"
  >
    <h1
      class="text-5xl text-white uppercase font-bold max-w-sm"
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
