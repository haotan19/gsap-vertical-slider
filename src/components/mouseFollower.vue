<script lang="ts" setup>
import { onMounted } from 'vue';
import { gsap } from "gsap";

onMounted(() => {
    gsap.set(".ball", {xPercent: -50, yPercent: -50});
    
    let xTo = gsap.quickTo(".ball", "x", {duration: 0.6, ease: "power3"}),
        yTo = gsap.quickTo(".ball", "y", {duration: 0.6, ease: "power3"});
    
    window.addEventListener("mousemove", e => {
      xTo(e.clientX);
      yTo(e.clientY);
    });
})    
</script>

<template>
<div class="ball"></div>
</template>

<style>
.ball {
  width: 50px;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  border: 3px solid dodgerblue;
  border-radius: 50%;
  pointer-events: none;
}
</style>