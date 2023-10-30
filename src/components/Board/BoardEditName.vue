<template>
  <ItemEditName :item="boardItem" @endEditing="handleEndEditing" class="text-white  text-left text-3xl font-bold hover:bg-gray-600/20 p-2" />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ItemEditName from '../ItemEditName.vue';

interface Board {
  id: string;
  name: string;
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
    boardItem: Object as () => Board,
  },
  components: {
    ItemEditName,
  },
  methods: {
    handleEndEditing(updatedItem: Board, isChange: boolean) {
     
     console.log('isChange', isChange)
      if (isChange) {
        this.$appAxios.put(`/board/${updatedItem.id}`, { 
          name: updatedItem.name, 
        }).then((update_response) => {
          console.log('board update_response', update_response);
        });
        console.log('updatedItem', updatedItem);
        localStorage.setItem('activeBoardName', updatedItem.name);
      } else {
        console.log('isChange is false, axios request will not be sent.');
      }
    }
  },
});
</script>
