<template>
    <ItemEditName :item="listItem" @endEditing="handleEndEditing" class="text-start text-xl" />    
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  import ItemEditName from '../ItemEditName.vue';
  
  interface CardItem {
    name: string;
    listeName: string;
    listeId: string;
    position:number;
    description: string;
    id: string;
  }
  
  interface ListItem {
    name: string;
    position: number;
    cards: CardItem[];
    id: string;
    showCardInput: boolean; // Her liste öğesi için showCardInput verisi
  }
  
  export default defineComponent({
    data() {
      return {
        activeBoardId: "",
      };
    },
    created() {
      this.activeBoardId = localStorage.getItem('activeBoardId');
    },
    props: {
      listItem: Object as () => ListItem,
    },
    components: {
      ItemEditName,
    },
    methods: {
      handleEndEditing(updatedItem: ListItem) {
        console.log("Liste End Editing");
        this.$appAxios.put(`/liste/${updatedItem.id}`, { 
          name: updatedItem.name, 
          position: updatedItem.position, 
          boardId: this.activeBoardId 
        }).then((update_response) => {
          console.log('update_response', update_response);
        });
      }
    },
  });
  </script>
  