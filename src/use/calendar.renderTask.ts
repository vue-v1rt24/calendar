import {ITaskTypes} from '../types/task.types';

export const getKey = (data: Date) => {
    return data.toLocaleDateString();
};

const sortTask = (a: any, b: any) => a.date.getTime() - b.date.getTime();

export const useCalendarRenderTask = (tasks: ITaskTypes[]) => {
    let taskData: Record<string, ITaskTypes[]> = {};

    for (const task of tasks) {
        const key = getKey(task.date);
        const data = taskData[key] || [];
        data.push(task);
        data.sort(sortTask);
        taskData[key] = data;
    }

    return {
        taskData,
    };
};

