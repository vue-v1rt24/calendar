<template>
  <ul class="weekday list-group list-group-horizontal">
    <li
        v-for="(item, idx) in 7"
        :key="item"
        class="weekday__item list-group-item"
    >
      {{ getWeekdayName(idx) }}
    </li>
  </ul>
</template>

<script setup lang="ts">
import {getWeekdayName} from '../utils/date.utils';
</script>

<style scoped>
.weekday {
  text-align: center;
  margin-bottom: 30px;
}

.weekday__item {
  width: calc(100% / 7);
  text-transform: uppercase;
}
</style>