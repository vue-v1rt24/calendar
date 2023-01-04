<template>
  <div class="card" :class="isCurrentData">
    <div class="card__item card-body">
      <svg width="20" height="20" fill="currentColor" class="btnPlus" @click="addTask">
        <use xlink:href="../assets/img/sprite.svg#plus"></use>
      </svg>

      <strong>{{ day.getDate() }}</strong>
    </div>

    <div class="card-body border-top position-relative" v-if="tasks?.length">
      <Marker
          :tasks="tasks"
          :count="count"
          @click="marketHandler"
      />

      <RenderTasks
          :tasks="tasks"
          :count="count"
          @setEditTask="setEditTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {calendarStore} from '../stores/calendarStore';
import {getCurrentDay} from '../utils/date.utils';
import {ITaskTypes} from '../types/task.types';
import Marker from './Marker.vue';
import RenderTasks from './RenderTasks.vue';

//
const props = defineProps<{
  day: Date
  tasks?: ITaskTypes[]
}>();

//
const count = 2;

//
const isCurrentData = computed(() => {
  if (getCurrentDay(props.day)) {
    return 'text-bg-primary';
  }
});

//
const addTask = () => {
  calendarStore.openTaskModal = {date: props.day};
};

const setEditTask = (task: ITaskTypes) => {
  calendarStore.openEditTaskModal = {task};
};

const marketHandler = () => {
  calendarStore.openTaskListModal = {tasks: props.tasks || []};
};
</script>

<style scoped>
.card {
  user-select: none;
  border: none;
  box-shadow: 0 .125rem .25rem rgba(0, 0, 0, .075);
  transition: box-shadow .3s;
}

.card:hover {
  box-shadow: 0 .5rem 1rem rgba(0, 0, 0, .15);
}

.card__item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}


.btnPlus {
  cursor: pointer;
}
</style>