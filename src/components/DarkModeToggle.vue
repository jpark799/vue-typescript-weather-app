<script setup lang="ts">
defineProps<{
  isDark: boolean;
}>();

defineEmits<{
  toggle: [];
}>();
</script>

<template>
  <button
    @click="$emit('toggle')"
    class="absolute top-6 right-6 p-2 rounded-full cursor-pointer bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white transition-colors duration-200 text-xl"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
  >
    {{ isDark ? "☀️" : "🌙" }}
  </button>
</template>
