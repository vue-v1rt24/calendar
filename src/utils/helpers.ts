import {ITaskTypes} from '../types/task.types';

export const getRenderDataLocal = (tasks: ITaskTypes[]) => {
    for (const task of tasks) {
        task.date = new Date(task.date);
    }

    return tasks;
};

export class SetDataTask {
    constructor(public date: Date, public hours: number, public minutes: number, public title: string = '', public desc: string = '', public finished: string = 'no') {
    }
}