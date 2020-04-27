import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, transferArrayItem } from '@angular/cdk/drag-drop';
import { Board } from '../../models/board.model';
import { Column } from '../../models/column.model';
import { TaskService } from '../task.service';
import { Task } from '../task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {

  showModal: boolean = false;
  itemEdit: Task;

  constructor(private taskService : TaskService) { }

  board: Board = new Board('My Board', [
    new Column('To Do', 'TO_DO',[]),
    new Column('Doing', 'DOING', []),
    new Column('Done', 'DONE',[])
  ]);

  ngOnInit() {
    this.refreshAll();
  }

  saveTask(task) {
    this.getToDo();
  }

  addTask() {
    this.showModal = true;
  }

  editTask(item) {
    this.itemEdit = item;
    this.showModal = true;
  }

  deleteTask(id){
    this.taskService.delete(id).then(() => this.refreshAll());
  }

  refreshAll(){
    this.getToDo();
    this.getDoing();
    this.getDone();
  }

  drop(event: CdkDragDrop<string[]>) {
    const newStatus = event.container.id;
    if (newStatus != event.item.data.status){
      this.updateTask(newStatus, event.item.data.id);
      event.item.data.status = newStatus;
      transferArrayItem(event.previousContainer.data, event.container.data,
                        event.previousIndex, event.currentIndex);
    }
     
  }

  updateTask(status: string, id: string){
    switch(status){
      case 'TO_DO':
        this.taskService.updateToDo(id);
        break;
      case 'DOING':
        this.taskService.updateToDoing(id);
        break;
      case 'DONE':
        this.taskService.updateToDone(id);
        break;
    }
  }

  getToDo(){
    this.taskService.getToDo().then(tasks => {
      this.board.columns[0].tasks = tasks;
    });
  }

  getDoing(){
    this.taskService.getDoing().then(tasks => {
      this.board.columns[1].tasks = tasks;
    });
  }

  getDone(){
    this.taskService.getDone().then(tasks => {
      this.board.columns[2].tasks = tasks;
    });
  }

}
