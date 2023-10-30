<template>
  <div class="card">
    <div class="card-header bg-blue-500 text-white py-2">
      <h2>{{ card.title }}</h2>
    </div>
    <div class="card-content p-4">
      <p>{{ card.description }}</p>
    </div>
   
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    card: Object,
  },
  methods: {
  },
});
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  margin: 10px;
  background-color: #f9f9f9;
}

.card-header {
  background-color: #0079BF;
}

</style>
