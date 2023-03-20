<script setup lang="ts">
import { computed, ref } from "vue";
import { parse } from "./parser";

const old = ref(`
public class User {
 
 @Schema(description="用户名")
 private String username;

 @Schema(description="年龄")
 private Integer age;

 @Schema(description="薪资")
 private Double salary;

}
`);
const res = computed(() => parse(old.value));

const showMessage = ref(false);

function copy() {
  if (res.value) {
    navigator.clipboard.writeText(res.value);
    showMessage.value = true;
    setTimeout(() => {
      showMessage.value = false;
    }, 1000);
  }
}
</script>

<template>
  <div class="app">
    <textarea cols="70" rows="50" v-model="old"></textarea>
    <div>
      <textarea
        cols="70"
        rows="50"
        :value="res"
        style="margin-left: 20px"
      ></textarea>
      <button @click="copy">复制</button>
      <span v-show="showMessage">复制成功</span>
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
}
</style>
