import {reactive} from 'vue';
import {ITaskTypes} from '../types/task.types';
import {LocalStorageUtils} from '../utils/localStorage.utils';
import {getRenderDataLocal} from '../utils/helpers';

const localNameTask = import.meta.env.VITE_TASK_LOCALSTORAGE_KEY;

export const calendarStore = reactive({
    calendarDate: new Date(),
    tasks: getRenderDataLocal(LocalStorageUtils.getLocal(localNameTask) || []) as ITaskTypes[],
    openTaskModal: {} as { date: Date },
    openEditTaskModal: {} as { task: ITaskTypes },
    openTaskListModal: {} as { tasks: ITaskTypes[] },

    // Изменение месяца
    updateMonth(num: number) {
        const d = new Date(this.calendarDate);
        d.setMonth(d.getMonth() + num);
        this.calendarDate = d;
    },

    // Изменение года
    updateYear(num: number) {
        const d = new Date(this.calendarDate);
        d.setFullYear(d.getFullYear() + num);
        this.calendarDate = d;
    },

    // Добавление задачи
    addTask(task: ITaskTypes) {
        this.tasks.push(task);
        LocalStorageUtils.setLocal(localNameTask, this.tasks);
    },

    // Обновление задачи
    updateTask(oldTask: ITaskTypes, newTask: ITaskTypes) {
        Object.assign(oldTask, newTask);
        LocalStorageUtils.setLocal(localNameTask, this.tasks);
    },

    // Удаление задачи
    removeTask(task: ITaskTypes) {
        const idx = this.tasks.indexOf(task);
        if (idx < 0) return console.error('Задача не удалена');
        this.tasks.splice(idx, 1);
        LocalStorageUtils.setLocal(localNameTask, this.tasks);
    },
});