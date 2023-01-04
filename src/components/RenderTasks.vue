<template>
<span
    v-for="task in limitTasks"
    :key="task.date.getTime()"
    class="task d-block text-truncate"
    :class="{'text-muted text-decoration-line-through': task.finished === 'yes'}"
    :title="task.title"
    v-tooltip="task.title"
    @click="emit('setEditTask', task)"
>
  {{ task.title }}
</span>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import Tooltip from '../directives/tooltip';
import {ITaskTypes} from '../types/task.types';

//
const props = defineProps<{
  tasks: ITaskTypes[]
  count: number
}>();

//
const emit = defineEmits<{
  (e: 'setEditTask', task: ITaskTypes): void
}>();

//
const limitTasks = computed(() => props.tasks?.slice(0, props.count));

//
const vTooltip = Tooltip;
</script>

<style scoped>
.task {
  cursor: pointer;
}

.task:hover {
  text-decoration: underline;
}
</style>