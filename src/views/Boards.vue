<template>
  <div>
    <h1 class="text-3xl font-semibold">Panolar</h1>

    <div class="flex flex-wrap justify-between -mx-2 mt-6">
      <BoardItem
        v-for="boardItem in boardItems.items"
        :key="boardItem.id"
        :boardItem="boardItem"
        @boardItemClick="boardItemClick"
      />
    </div>

    <input v-model="newBoardName" type="text" placeholder="Yeni Pano" class="w-full p-2 mt-6 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
    <hr class="my-6">

    <button class="add-board-button bg-blue-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700" @click="addBoard">Board Ekle</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted,inject } from 'vue';
import { format } from 'date-fns';
import { useStore } from "vuex";
import { AxiosInstance } from 'axios';
import BoardItem from "../components/Board/BoardItem.vue"
import { useRouter } from 'vue-router';
import axios from "axios"
interface BoardItem {
  id: number;
  name: string;
  creationTime: string;
}
interface BoardItems {
  items: BoardItem[];
  totalCount: number;
}
const boardItems = ref<BoardItems>({
  items: [],
  totalCount: 0,
});

const newBoardName = ref<string>('');
const appAxios = inject<AxiosInstance>("appAxios") ?? axios.create();
const store = useStore();
const router=useRouter();


const fetchBoardItems = () => {
  // API isteğinizi uygun şekilde değiştirin
  appAxios.get("/board?SkipCount=0&MaxResultCount=100")
    .then((response) => {
      boardItems.value = response.data;
    })
    .catch((error) => {
      console.error("API Hatası:", error);
    });
};

const addBoard = () => {
  appAxios.post("/board", { name: newBoardName.value })
    .then((save_board_response) => {
      console.log('save_board_response', save_board_response);
    })
    .catch((error) => {
      console.error("API Hatası:", error);
    });
};

// const formatCreationTime = (creationTime: string) => {
//   return format(new Date(creationTime), 'dd-MM-yyyy');
// };

const boardItemClick = (boardItem: BoardItem) => {
  // Panoya tıklanıldığında yapılacak işlemler
  console.log('boardItem', boardItem);
  store.dispatch('setActiveBoardId', boardItem.id);
  store.dispatch('setActiveBoardName', boardItem.name);
  console.log('activeBoardId', store.state.activeBoardId);
  console.log('activeBoardName', store.state.activeBoardName);
  localStorage.setItem('activeBoardId', store.state.activeBoardId.toString());
  localStorage.setItem('activeBoardName', store.state.activeBoardName);
  router.push(`/board/${boardItem.id}`);
};

onMounted(() => {
  fetchBoardItems();
});
</script>

<style scoped>

</style>
