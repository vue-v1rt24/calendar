<template>
  <form ref="form" @submit.prevent="addTaskHandler">
    <div class="mb-3 row">
      <label for="title" class="col-sm-4 col-form-label">Заголовок задачи</label>
      <div class="col-sm-8">
        <input type="text" class="form-control" id="title" required v-model="formFields.title">
      </div>
    </div>

    <div class="mb-3 row">
      <label for="desc" class="col-sm-4 col-form-label">Описание задачи</label>
      <div class="col-sm-8">
        <textarea class="form-control" id="desc" rows="3" v-model="formFields.desc"></textarea>
      </div>
    </div>

    <div class="mb-3 row">
      <label for="date" class="col-sm-4 col-form-label">Дата исполнения</label>
      <div class="col-sm-4">
        <input type="date" class="form-control" id="date" required v-model="formFields.date">
      </div>
      <div class="col-sm-2">
        <input type="number" min="0" max="23" class="form-control" required v-model.number="formFields.hours">
      </div>
      <div class="col-sm-2">
        <input type="number" min="0" max="59" class="form-control" required v-model.number="formFields.minutes">
      </div>
    </div>

    <div class="mb-3 row">
      <label class="col-sm-4 col-form-label">Закончена</label>
      <div class="col-sm-8">
        <div class="form-check">
          <input class="form-check-input" type="radio" id="yes" value="yes" v-model="formFields.finished">
          <label class="form-check-label" for="yes">
            Да
          </label>
        </div>

        <div class="form-check">
          <input class="form-check-input" type="radio" id="no" value="no" v-model="formFields.finished">
          <label class="form-check-label" for="no">
            Нет
          </label>
        </div>
      </div>
    </div>

    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
      <button type="button" class="btn btn-danger" v-if="isEditTask" @click="removeTask">Удалить</button>
      <button type="submit" class="btn btn-primary" :disabled="!form?.checkValidity()">
        Сохранить
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import {ref, reactive, watch, nextTick, getCurrentInstance} from 'vue';
import {calendarStore} from '../stores/calendarStore';
import {getISODate} from '../utils/date.utils';

//
const appInstance = getCurrentInstance();
const $forceUpdate = appInstance?.proxy?.$forceUpdate;

//
const props = defineProps<{
  dataset?: any
  closeForm?: { bool: boolean }
  isEditTask: boolean
}>();

//
const emit = defineEmits<{
  (e: 'addTaskSubmit'): void
}>();

//
const form = ref<HTMLFormElement | null>(null);

const formFields = reactive({
  title: '',
  desc: '',
  date: '',
  hours: 0,
  minutes: 0,
  finished: 'no',
});

//
const clearForm = async () => {
  formFields.title = formFields.desc = '';
  formFields.finished = 'no';

  await nextTick();
  $forceUpdate!();
};

const addTaskHandler = () => {
  const d = new Date(formFields.date);
  d.setHours(formFields.hours);
  d.setMinutes(formFields.minutes);

  const task = {
    title: formFields.title,
    desc: formFields.desc,
    date: d,
    finished: formFields.finished,
  };

  if (props.isEditTask) {
    calendarStore.updateTask(calendarStore.openEditTaskModal.task, task);
  } else {
    calendarStore.addTask(task);
  }

  emit('addTaskSubmit');
};

const removeTask = () => {
  calendarStore.removeTask(calendarStore.openEditTaskModal.task);
  emit('addTaskSubmit');
};

//
watch(() => props.dataset, value => {
  formFields.title = value.title;
  formFields.desc = value.desc;
  formFields.date = getISODate(value.date);
  formFields.hours = value.hours;
  formFields.minutes = value.minutes;
  formFields.finished = value.finished;
});

watch(() => props.closeForm, value => {
  clearForm();
});
</script>

<style scoped>

</style>