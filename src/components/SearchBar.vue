<script setup lang="ts">
import { ref } from "vue";

const query = ref("");

const emit = defineEmits<{
  search: [city: string];
}>();

function handleSubmit() {
  if (query.value.trim()) {
    emit("search", query.value.trim());
    query.value = "";
  }
}
</script>

<template>
  <form
    @submit.prevent="handleSubmit"
    class="flex gap-2 w-full max-w-md mx-auto mt-8"
  >
    <input
      v-model="query"
      type="text"
      placeholder="Search city?"
      class="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 dark:text-white focus:ring-blue-400"
    />
    <button
      type="submit"
      class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200"
    >
      Search
    </button>
  </form>
</template>
