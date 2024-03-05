<script setup lang="ts">
import { computed, ref } from 'vue'
import { Button, ConfigProvider, Input, Space, theme } from 'ant-design-vue'
import { useClipboard, useDark } from '@vueuse/core'
import LayoutHeader from './components/LayoutHeader.vue'
import { parse } from './utils/parser'

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

const isDark = useDark()

const rows = ref(30)

const { copied, isSupported, copy } = useClipboard({ source: res })
</script>

<template>
  <ConfigProvider :theme="{ algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm }">
    <LayoutHeader />

    <div class="h-[calc(100vh-50px)] overflow-hidden p-3 grid grid-cols-2 gap-x-4">
      <div class="flex flex-col gap-y-3">
        <Space class="flex-none">
          <Button @click="old = ''">
            清空
          </Button>
        </Space>
        <Input.TextArea
          v-model:value="old"
          class="text-nowrap flex-1 font-[monospace]"
          :rows="rows"
        />
      </div>

      <div class="flex flex-col gap-y-3">
        <Space class="flex-none">
          <Button v-if="isSupported" type="primary" @click="copy()">
            <template v-if="copied" #icon>
              <div class="mr-1 i-ant-design:check-outlined" />
            </template>
            {{ copied ? "已复制" : '复制结果' }}
          </Button>
        </Space>
        <Input.TextArea
          class="text-nowrap flex-1 font-[monospace]"
          :value="res" :rows="rows" readonly
        />
      </div>
    </div>
  </ConfigProvider>
</template>

<style lang="scss" scoped></style>
