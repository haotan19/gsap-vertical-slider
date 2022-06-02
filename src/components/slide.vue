<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps<{
  pos: number;
  idx: number;
}>();

const el = ref<HTMLElement | null>(null);
const moveToPos = (newPos: number, oldPos: number) => {
  if (oldPos === 2 || oldPos === -2) {
    if (newPos === 2 || newPos === -2) {
      // TODO: Use the old position to trigger the unique animation between -2 <-> 2
      console.log("TRIGGER SPECIAL");
    }
  }
  gsap.to(el.value, {
    x: 300 * newPos,
  });
};
watch(() => props.pos, moveToPos);

const handleMouseOverEffect = (event: PointerEvent) => {
  const rect = el.value?.getBoundingClientRect();
  if (rect) {
    const horizontalPercentage = (event.clientX - (rect.right + rect.left) / 2) / rect.width * 100 * 2;
    const verticalPercentage = ((rect.bottom + rect.top) / 2 - event.clientY) / rect.height * 100 * 2;
    gsap.to(el.value, {
        rotateX: 5 * verticalPercentage / 100,
        rotateY: 4 * horizontalPercentage / 100,
    });
  }
};
const resetMouseOverEffect = (event: PointerEvent) => {
    gsap.to(el.value, {
        rotateX: 0,
        rotateY: 0,
    });
};

onMounted(() => {
  gsap.to(el.value, {
    rotateY: -5,
  });
});
</script>

<template>
  <!-- if POS is 0, set it to screen center -->
  <div
    ref="el"
    class="absolute left-1/2 -translate-x-1/2 w-[300px] h-[500px] bg-slate-300"
    @pointermove="handleMouseOverEffect"
    @pointerleave="resetMouseOverEffect"
  >
    IDX: {{ idx }} Slide POS: {{ pos }}
  </div>
</template>

<style></style>
