<template>
    <div @click="startEditing" v-if="!isEditing">
      <div
        class="text-xl font-semibold mb-2 cursor-pointer hover:bg-gray-200 transition duration-200"
      >
        {{ value }}
      </div>
    </div>
    <div v-else>
      <input
        type="text"
        class="text-xl font-semibold mb-2 text-center w-3/4"
        v-model="editedValue"
        @blur="endEditing"
        @keydown.enter="endEditing"
        ref="editInput"
      />
    </div>
  </template>
  
  <script>
  export default {
    props: {
      value: String, // Liste adı
    },
    data() {
      return {
        isEditing: false, // Düzenleme modu durumu
        editedValue: "", // Düzenlenen liste adı
      };
    },
    methods: {
      startEditing() {
        // Düzenleme modunu başlat
        this.isEditing = true;
        this.editedValue = this.value;
        this.$nextTick(() => {
          this.$refs.editInput.focus();
        });
      },
      endEditing() {
        // Düzenleme modunu bitir
        this.isEditing = false;
        // Düzenlenmiş liste adını ana bileşene iletiyoruz
        this.$emit("update:value", this.editedValue);
      },
    },
  };
  </script>
  