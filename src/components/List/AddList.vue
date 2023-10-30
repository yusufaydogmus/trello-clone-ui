<template>
  <div class="flex flex-col">
    <input
      ref="newListInput"
      type="text"
      class="p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      v-model="newListName"
      @blur="closeAddList"
    />
    <button
      class="bg-blue-500 w-full hover:bg-blue-700 text-black font-semibold ms-2 my-1 py-2 w-1/5 h-10 px-4 rounded"
      @click="addList"
    >
      Liste Ekle
    </button>
  </div>
</template>

<script lang="ts">
import { ref, inject, onMounted } from 'vue'; // ref ve onMounted ekleniyor

export default {
  props: {},
  data() {
    return {
      newListName: '',
      appAxios: inject("appAxios"),
    };
  },
  setup() {
    const newListInput = ref(null); // ref'i tanımlayın

    const focusNewListInput = () => {
      newListInput.value.focus(); // input öğesine odaklanma işlemi
    };

    onMounted(() => {
      // Komponent oluşturulduğunda otomatik olarak odaklan
      focusNewListInput();
    });

    return {
      newListInput,
      focusNewListInput,
    };
  },
  created() {
    this.activeBoardId = localStorage.getItem('activeBoardId');
  },
  methods: {
    addList() {
      console.log('newListName', this.newListName)
    },
    closeAddList() {
      console.log('AddList componenti close çalıştı')
      if (this.newListName.trim() !== '') { // newListName boş değilse devam et
        this.appAxios.post("/liste",{name:this.newListName,boardId:this.activeBoardId}).then((save_list_response)=>{
        console.log('save_list_response', save_list_response)
        this.$emit("close-add-list",save_list_response);
      });
      }
      this.$emit("close-add-list");
      
    },
  },
};
</script>
