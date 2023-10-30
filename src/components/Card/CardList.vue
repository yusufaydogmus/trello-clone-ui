
<template>
    
<!--
     Liste adı yazılsın 
    Burada List Id'ye göre  cardlar getirilsin
-->
<div>

</div>
</template>
  
  <script lang="ts">
  import { defineComponent } from 'vue';
  import CardItem from './components/Card/CardItem.vue';
  
  export default defineComponent({
    components: {
      CardItem,
    },
    data() {
      return {
        card: {
          title: 'Sample Card',
          description: 'This is a sample card item created with Vue.js, TypeScript, and Tailwind CSS',
        },
      };
    },
  });
  </script>