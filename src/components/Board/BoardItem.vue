<template>
      <div class="board-item   w-1/6 p-6 cursor-pointer hover:bg-gray-200 border border-gray-300 rounded-lg mb-4" @click="boardItemClick">
        <div class="board">
          <h2 class="text-xl  overflow-clip font-semibold text-black">{{ boardItem.name }}</h2>
          <p class="text-gray-600">{{ formatCreationTime(boardItem.creationTime) }}</p>
        </div>
      </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import { format } from 'date-fns';

export default defineComponent({
  props: {
    boardItem: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCreationTime(creationTime:Date) {
      return format(new Date(creationTime), 'dd-MM-yyyy');
    },
    boardItemClick() {
      this.$emit('boardItemClick', this.boardItem);
    },
  },
});
</script>
<style scoped>
.board-item {
  background-color: #f6f6f6;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease-in-out;
}
</style>
