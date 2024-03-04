<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { computed } from 'vue'

const isDark = useDark()
const toggleDark = useToggle(isDark)

const title = computed(() => isDark.value ? 'Switch to light theme' : 'Switch to dark theme')
</script>

<template>
  <button class="toggle-dark" :title="title" @click="toggleDark()">
    <div class="thumb">
      <i class="i-ant-design:sun-outlined dark:i-ant-design:moon-outlined" />
    </div>
  </button>
</template>

<style lang="scss" scoped>
.toggle-dark {
  position: relative;
  border-radius: 11px;
  width: 40px;
  height: 22px;
  cursor: pointer;
  border: 1px solid #c2c2c4;
  background: rgba(142, 150, 170, .14);

  .thumb {
    position: absolute;
    font-size: 14px;
    top: 1px;
    left: 1px;
    width: 18px;
    height: 18px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform .25s!important;
  }
}

.dark .toggle-dark {
  border: 1px solid #3c3f44;
  background: rgba(101, 117, 133, .16);
  .thumb {
    background-color: #000;
    transform: translateX(18px);
  }
}
</style>
