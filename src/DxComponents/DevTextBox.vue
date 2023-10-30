<template>
  <div class="field">
    <div class="value">
      <DxTextBox
      v-show="false"
        :value="text"
        :max-length="40"
        :input-attr="{ 'aria-label': 'Title' }"
        @update:value="updateText"
      />
    </div>
    <!-- <input
      v-show="item.isEditing"
      ref="inputField"
      type="text"
      class="text-xl font-semibold mb-2 text-center w-3/4"
      v-model="item.name"
      @keydown.enter="endEditing(item)"
      @blur="endEditing(item)"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import DxTextBox from 'devextreme-vue/text-box';

const { text } = defineProps(['text']);

const updateText = (newValue) => {
  text.value = newValue;
};
</script>
