<script lang="ts" setup>
defineProps<{
    pos: number,
    idx: number
}>()
</script>

<template>
<!-- if POS is 0, set it to screen center -->
    <div class="absolute left-1/2 -translate-x-1/2  w-[300px] h-[500px] bg-slate-300">IDX: {{ idx }} Slide POS: {{ pos }}</div>
</template>