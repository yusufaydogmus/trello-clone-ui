<template>
  <div class="container">
    <div class="m-0 mt-4">
      <input
        v-model="name"
        placeholder="Kart Adı"
        class="w-full p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      />
      <!-- Eğer hasDescription true ise açıklama alanını göster -->
      <textarea
        v-if="hasDescription"
        v-model="description"
        placeholder="Kart Açıklaması"
        class="w-full p-2 mb-2 h-32 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
      ></textarea>
      <div class="flex">
      <button
        @click="addCard"
        class="bg-blue-500 text-white rounded py-2 px-4 cursor-pointer hover:bg-blue-700 mt-2 block"
      >
        Kart Ekle
      </button>
      <button class=" bg-transparent  text-gray-600   hover:border-transparent  " @click=close()>
        <i class="fa fa-times " aria-hidden="true"></i>
      </button>
    </div>
    </div>
  </div>
</template>

  <script lang="ts">
  import DxTextArea from 'devextreme-vue/text-area'
  export default {
    props: {
      listeId: String, // Ana bileşenden listeId'yi alın
      hasDescription: Boolean, // Ana bileşenden hasDescription değerini alın
    },
    data() {
      return {
        name: "",
        description: "",
      };
    },
    components:{
        DxTextArea
    },
    methods: {
      addCard() {
        // CardItem objesini oluşturun ve ana bileşene gönderin
        const cardItem = {
          name: this.name,
          listeId: this.listeId,
          description: this.description,
        };
        console.log("CardInput cardItem : ",cardItem);
  
        this.$emit("add-card", cardItem);
    
        // Kart ekledikten sonra inputları sıfırlayın
        this.name = "";
        this.description = "";

      },
      close(){
        console.log("componentten çalıştı")
        this.$emit("closeCardInput");
      }
    },
  };
  </script>
  