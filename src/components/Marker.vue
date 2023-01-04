<template>
<span
    v-if="isTaskVisible"
    class="taskMarker position-absolute badge rounded-pill text-bg-primary"
>
  {{ tasks.length }}
</span>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import {ITaskTypes} from '../types/task.types';

//
const props = defineProps<{
  tasks: ITaskTypes[]
  count: number
}>();

//
const isTaskVisible = computed(() => props.tasks?.length > props.count);
</script>

<style scoped>
.taskMarker {
  top: -10px;
  left: 20px;
  cursor: pointer;
}
</style>