<script lang="ts" setup>
import { ref, watch } from "vue";
import { gsap } from "gsap";

const props = defineProps<{
  pos: number;
  idx: number;
}>();

const el = ref<HTMLElement | null>(null);
const moveToPos = (pos: number) => {
  console.log(pos);
  gsap.to(el.value, {
    x: (300 * pos),
  });
};
watch(
  () => props.pos,
  (newPos) => {
    moveToPos(newPos);
  }
);
// Watch pos changes?
</script>

<template>
  <!-- if POS is 0, set it to screen center -->
  <div
    ref="el"
    class="absolute left-1/2 -translate-x-1/2 w-[300px] h-[500px] bg-slate-300"
  >
    IDX: {{ idx }} Slide POS: {{ pos }}
  </div>
</template>
