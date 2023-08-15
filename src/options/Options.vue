<script setup lang="ts">
  import { colorMode } from "~/logic/storage";

  function toggleDarkMode() {
    colorMode.value = colorMode.value === "dark" ? "light" : "dark";
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
      {{ colorMode }}
    </button>

    <div class="mt-4">
      Powered by Vite
      <pixelarticons-zap class="align-middle inline-block" />
    </div>
  </main>
</template>
