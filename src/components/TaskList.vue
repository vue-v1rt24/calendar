<template>
  <ul class="list-group list-group-flush" v-if="tasks?.length">
    <li
        v-for="task in tasks"
        :key="task.date.getTime()"
        @click="emit('TaskListHandler', task)"
        :class="{'text-muted text-decoration-line-through': task.finished === 'yes'}"
        class="list-group-item"
    >
      {{ task.title }}
    </li>
  </ul>

  <div v-else>
    Задач пока нет
  </div>
</template>

<script setup lang="ts">
import {ITaskTypes} from '../types/task.types';

const props = defineProps<{
  tasks?: ITaskTypes[]
}>();

//
const emit = defineEmits<{
  (e: 'TaskListHandler', val: ITaskTypes): void
}>();
</script>

<style scoped>
.list-group-item {
  cursor: pointer;
}
</style>