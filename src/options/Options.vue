<script setup lang="ts">
  import { isDark } from "~/logic/storage";

  function toggleDarkMode() {
    isDark.value = !isDark.value;
  }
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <img src="/assets/icon.svg" class="icon-btn mx-2 text-2xl" alt="extension icon" />
    <div>Options</div>
    <SharedSubtitle />

    <button
      type="button"
      class="border border-gray-400 rounded px-2 py-1 mt-2"
      @click="toggleDarkMode"
    >
      {{ isDark }}
    </button>

    <div class="mt-4">
      Powered by Vite
      <pixelarticons-zap class="align-middle inline-block" />
    </div>
  </main>
</template>
