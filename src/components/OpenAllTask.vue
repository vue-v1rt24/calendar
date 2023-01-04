<template>
  <div class="menu">
    <svg width="30" height="30" class="btnSelector" @click="emit('openAllTaskHandler')">
      <use xlink:href="../assets/img/sprite.svg#menu"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'openAllTaskHandler'): void
}>();
</script>

<style scoped>
.menu {
  cursor: pointer;
}
</style>