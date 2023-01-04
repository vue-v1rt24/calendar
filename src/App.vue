<template>
  <div class="container pt-5 pb-5">
    <CalendarSelector/>
    <Weekday/>
    <Calendar/>
  </div>
</template>

<script setup lang="ts">

import Calendar from './components/Calendar.vue';
import Weekday from './components/Weekday.vue';
import CalendarSelector from './components/CalendarSelector.vue';
</script>

<style scoped>

</style>