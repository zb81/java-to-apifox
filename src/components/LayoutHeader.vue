<script setup lang="ts">
import ToggleDark from './ToggleDark.vue'

const appName = import.meta.env.VITE_APP_NAME
const github = import.meta.env.VITE_APP_GITHUB
</script>

<template>
  <div class="h-[50px] border-color border-b px-8 flex items-center justify-between">
    <h1>{{ appName }}</h1>
    <div class="flex items-center gap-x-6 select-none">
      <ToggleDark />
      <a class="i-ant-design:github-outlined text-6" :href="github" target="_blank" />
    </div>
  </div>
</template>
