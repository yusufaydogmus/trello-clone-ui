<template>
  <div @click="startEditing(item)">
    <div
      v-show="!item.isEditing"
      class=" font-semibold mb-2 max-w-xs cursor-pointer  transition duration-200"
    >
      {{ item.name }}
    </div>
    <input
      v-show="item.isEditing"
      ref="inputField"
      type="text"
      class="text-inherit font-semibold mb-2 text-start w-3/4"
      v-model="item.name"
      @keydown.enter="endEditing(item)"
      @blur="endEditing(item)"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, ref, nextTick } from "vue";

interface Item {
  name: string;
  isEditing: boolean;
}

const props = defineProps({
  item: Object as () => Item,
});

const emit = defineEmits(["endEditing"]);
let first = ref<string>("");
let last = ref<string>("");
const inputField = ref<HTMLInputElement | null>(null);

const startEditing = async (item: Item) => {
  item.isEditing = true;
  await nextTick();
  if (inputField.value) {
    inputField.value.focus();
    inputField.value.select();
  }
  first = item.name;
};

const endEditing = (item: Item) => {
  item.isEditing = false;
  emit("endEditing", item, isChange());
  last = item.name;
};

const isChange = () => {
  return first.value !== last.value;
};
</script>
