<script setup lang="ts">
import { computed, ref } from 'vue'
import { parse } from './parser'

const old = ref(`public class AnswerRecord {
    /**
     * 问题
     */
    private String question;
    /**
     * 问题id
     */
    private String questionId;
    /**
     * 问卷类型，bmi, MNA-SF（微营养评估），habit（生活习惯），medicationHistory（用药史），illnessHistory(疾病史)，
     * allergicHistory（过敏史）
     */
    private String questionnaireType;
    /**
     * 答案解析方式，1、单选题；2、多选题；3、填空题;4、单选—填空-选择
     */
    private String questionType;

    /**
     * 选项和值
     */
    private List<OptionValue> options;

    /**
     * 下一题id
     */
    private String nextQuestionId;

    /**
     * 下一题题库
     */
    private String nextQuestionnaireType;
    /**
     * 当前题目所在的大题名字
     */
    private String topicTitleName;
    /**
     * 标记
     */
    private String tag;
}`)

const res = computed(() => parse(old.value))

const showMessage = ref(false)

function copy() {
  if (res.value) {
    navigator.clipboard.writeText(res.value)
    showMessage.value = true
    setTimeout(() => {
      showMessage.value = false
    }, 1000)
  }
}
</script>

<template>
  <div class="app">
    <textarea v-model="old" cols="70" rows="50" />
    <div>
      <textarea
        cols="70"
        rows="50"
        :value="res"
        style="margin-left: 20px"
      />
      <button @click="copy">
        复制
      </button>
      <span v-show="showMessage">复制成功</span>
    </div>
  </div>
</template>

<style>
.app {
  display: flex;
}
</style>
