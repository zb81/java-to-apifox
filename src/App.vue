<script setup lang="ts">
import { computed, ref } from 'vue';
import {parse} from './parser'

const old = ref('')
const res = computed(() => parse(old.value))
</script>

<template>
  <div class="flex justify-between">
    <textarea cols="70" rows="50" v-model="old"></textarea>
    <textarea cols="70" rows="50" :value="res" style="margin-left: 20px;"></textarea>
  </div>
</template>

