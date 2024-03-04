<script setup lang="ts">
import ToggleDark from './ToggleDark.vue'
</script>

<template>
  <div class="border-color border-b py-3 px-8 flex items-center justify-between">
    <h1>Vue GitHub Page Starter</h1>
    <div class="flex items-center gap-x-6 select-none">
      <ToggleDark />
      <a class="i-ant-design:github-outlined text-6" href="https://github.com/zb81/java-model-parser" target="_blank" />
    </div>
  </div>
</template>
