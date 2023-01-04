<template>
  <div class="calendarSelector">
    <OpenAllTask
        @openAllTaskHandler="openAllTaskHandler"
    />

    <CalendarSelectorItem :title="nameMonth" @selectorHandler="changeMonth"/>
    <CalendarSelectorItem :title="nameYear" @selectorHandler="changeYear"/>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {calendarStore} from '../stores/calendarStore';
import {getMonthName} from '../utils/date.utils';
import CalendarSelectorItem from './CalendarSelectorItem.vue';
import OpenAllTask from './OpenAllTask.vue';

//
const nameMonth = computed(() => getMonthName(calendarStore.calendarDate.getMonth()));

const changeMonth = (num: number) => {
  calendarStore.updateMonth(num);
};

//
const nameYear = computed(() => calendarStore.calendarDate.getFullYear() + '');

const changeYear = (num: number) => {
  calendarStore.updateYear(num);
};

//
const openAllTaskHandler = () => {
  calendarStore.openTaskListModal = {tasks: calendarStore.tasks};
};
</script>

<style scoped>
.calendarSelector {
  display: flex;
  align-items: center;
  gap: 30px;
  margin-bottom: 30px;
}
</style>