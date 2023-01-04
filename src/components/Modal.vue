<template>
  <div class="modal fade" ref="modal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ title }}</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
        </div>
        <div class="modal-body">
          <slot/>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref, onMounted, onUnmounted} from 'vue';
import {Modal} from 'bootstrap';

//
const props = withDefaults(defineProps<{
  title?: string
}>(), {
  title: 'Заголовок модального окна',
});

//
const modal = ref<HTMLDivElement | null>(null);
const modalInstance = ref<any>(null);

//
const show = () => {
  modalInstance.value?.show(modal.value);
};

const hide = () => {
  modalInstance.value?.hide();
};

const actionsHidden = (callback: () => void) => {
  modal.value?.addEventListener('hidden.bs.modal', callback);
};

//
onMounted(() => {
  modalInstance.value = new Modal(modal.value!, {});
});

//
onUnmounted(() => {
  if (modalInstance.value?.dispose) {
    modalInstance.value.dispose;
  }
});

//
defineExpose({
  show,
  hide,
  actionsHidden,
});
</script>

<style scoped>

</style>