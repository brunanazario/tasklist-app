import { Task } from '../task/task';

export class Column {
    constructor(public name: string, 
                public status: string,
                public tasks: Task[]) {}
}