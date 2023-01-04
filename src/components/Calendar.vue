<template>
  <div class="calendar">
    <div
        v-for="day in days"
        class="calendar__item"
    >
      <CalendarItem
          v-if="day"
          :day="day"
          :tasks="tasks[getKey(day)]"
      />
    </div>
  </div>

  <Teleport to="body">
    <Modal
        :title="titleModal"
        ref="formAddTaskModal"
    >
      <AddEditTaskFormModal
          :dataset="dataset"
          :close-form="closeForm"
          :is-edit-task="isEditTask"
          @addTaskSubmit="formAddTaskModal?.hide()"
      />
    </Modal>

    <Modal
        title="Список задач"
        ref="taskListModal"
    >
      <TaskList
          :tasks="calendarStore.openTaskListModal.tasks"
          @TaskListHandler="TaskListHandler"
      />
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import {ref, watch, onMounted, watchEffect} from 'vue';
import {calendarStore} from '../stores/calendarStore';
import CalendarItem from './CalendarItem.vue';
import Modal from './Modal.vue';
import AddEditTaskFormModal from './AddEditTaskFormModal.vue';
import {useCalendar} from '../use/calendar';
import {getKey, useCalendarRenderTask} from '../use/calendar.renderTask';
import {SetDataTask} from '../utils/helpers';
import TaskList from './TaskList.vue';
import {ITaskTypes} from '../types/task.types';

//
const days = ref<Date[]>([]);
const tasks = ref<Record<string, ITaskTypes[]>>({});
const formAddTaskModal = ref<InstanceType<typeof Modal> | null>(null);
const taskListModal = ref<InstanceType<typeof Modal> | null>(null);
const closeForm = ref<{ bool: boolean }>({bool: false});

const titleModal = ref('');
const isEditTask = ref(false);
const dataset = ref<any>(null);

//
const setParams = (title: string, edit: boolean, data: any) => {
  titleModal.value = title;
  isEditTask.value = edit;
  dataset.value = data;
  formAddTaskModal.value?.show();
};

const TaskListHandler = (task: ITaskTypes) => {
  taskListModal.value?.hide();
  calendarStore.openEditTaskModal = {task};
};

//
onMounted(() => {
  formAddTaskModal.value?.actionsHidden(() => {
    closeForm.value = {bool: true};
  });
});

//
watch(() => calendarStore.openTaskModal, value => {
  const d = new Date();
  const task = new SetDataTask(value.date, d.getHours(), d.getMinutes());
  setParams('Добавить задачу', false, task);
});

watch(() => calendarStore.openEditTaskModal, value => {
  const {title, desc, date, finished} = value.task;
  const task = new SetDataTask(date, date.getHours(), date.getMinutes(), title, desc, finished);
  setParams('Редактировать задачу', true, task);
});

watch(() => calendarStore.openTaskListModal, () => {
  taskListModal.value?.show();
});

//
watchEffect(() => {
  // Вывод чисел месяца
  days.value = useCalendar(calendarStore.calendarDate).daysData;

  // Вывод задач
  tasks.value = useCalendarRenderTask(calendarStore.tasks).taskData;
});
</script>

<style scoped>
.calendar {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.calendar__item {
  width: calc((100% / 7) - 10px);
}
</style>