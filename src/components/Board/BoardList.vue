<template>
  <div>
    <BoardItem :boardItems="boardItems" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import BoardItem from "./components/BoardItem.vue"; // BoardItem bileşenini içe aktarın

interface BoardItem {
  id: number;
  name: string;
  creationDate: string;
}

export default defineComponent({
  components: {
    BoardItem, // BoardItem bileşenini burada kaydetin
  },
  setup() {
    const boardItems = ref<BoardItem[]>([
      { id: 1, name: 'Board 1', creationDate: '19 Eylül 2023' },
      { id: 2, name: 'Board 2', creationDate: '20 Eylül 2023' },
      { id: 3, name: 'Board 3', creationDate: '21 Eylül 2023' },
    ]);

    return {
      boardItems,
    };
  },
});
</script>
