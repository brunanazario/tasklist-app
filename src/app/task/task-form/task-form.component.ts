import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../task';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit {

  @Input()
  public task: Task;
  public formCadastro: FormGroup;
  public promises: any = {};

  @Output()
  onClose = new EventEmitter();
  @Output()
  saveTask = new EventEmitter<boolean>();
   
  constructor(private formBuilder: FormBuilder,
              private taskService : TaskService) { }

  ngOnInit() {
    const task = {
      id: [],
      title: ['', Validators.required],
      description: ['', Validators.required]
    };
    if (this.task) {
      task.id = [this.task.id, Validators.required];
      task.title = [this.task.title, Validators.required];
      task.description = [this.task.description, Validators.required];
    }

    this.formCadastro = this.formBuilder.group(task);
  }
   
  cancel() { 
    this.onClose.emit(null); 
  }

  actionTask(){
    if (this.task) {
      return "Edit"
    } else{
      return "Add"
    }
  }

  save() {
    this.taskService.save(this.formCadastro.value).then(task => {
      this.saveTask.emit(true);
      this.onClose.emit(null); 
    });
  }

}
