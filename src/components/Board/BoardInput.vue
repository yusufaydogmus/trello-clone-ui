<template>
    <input v-model="newBoardName" type="text" placeholder="Yeni Pano" class="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500">
    <button class="add-board-button bg-blue-500 text-white rounded px-4 py-2 cursor-pointer hover:bg-blue-700" @click="addBoard">Board Ekle</button>

  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    props: {
      newBoardName: {
        type: String,
        required: true,
      },
    },
    methods:{
        addBoard() {
      this.$appAxios.post("/board", { name: this.newBoardName })
        .then((save_board_response) => {
          console.log('save_board_response', save_board_response);
        })
        .catch((error) => {
          console.error("API Hatası:", error);
        });
    },
    }
    
  });
  </script>
  
  <style scoped>
  /* Gerekirse stil tanımlamalarınızı yapabilirsiniz. */
  </style>
  