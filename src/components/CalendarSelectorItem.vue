<template>
  <div class="CalendarSelectorItem">
    <svg width="30" height="30" class="btnSelector" @click="selectorHandler(-1)">
      <use xlink:href="../assets/img/sprite.svg#leftBtn"></use>
    </svg>

    <span class="CalendarSelectorItem__title">{{ title }}</span>

    <svg width="30" height="30" class="btnSelector" @click="selectorHandler(1)">
      <use xlink:href="../assets/img/sprite.svg#rightBtn"></use>
    </svg>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>();

//
const emit = defineEmits<{
  (e: 'selectorHandler', val: number): void
}>();

//
const selectorHandler = (num: number) => {
  emit('selectorHandler', num);
};
</script>

<style scoped>
.CalendarSelectorItem {
  display: flex;
  align-items: center;
  gap: 0 10px;
  user-select: none;
}

.btnSelector {
  cursor: pointer;
}

.CalendarSelectorItem__title {
  width: 100px;
  text-align: center;
  text-transform: capitalize;
}
</style>