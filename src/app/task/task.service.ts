import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Task } from 'src/app/task/task';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getToDo(): Promise<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.api.url}/tasks/todo`).toPromise();
  }

  getDoing(): Promise<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.api.url}/tasks/doing`).toPromise();
  }
  getDone(): Promise<Task[]> {
    return this.httpClient.get<Task[]>(`${environment.api.url}/tasks/done`).toPromise();
  }

  getTipoTarefaById(id: string): Promise<Task> {
    return this.httpClient.get<Task>(`${environment.api.url}/tipos-tarefas/${id}`).toPromise();
  }

  adicionarTipoTarefa(tipoCorrespondencia: Task): Promise<Task> {
    return this.httpClient.post<Task>(`${ environment.api.url }/tipos-tarefas`, tipoCorrespondencia).toPromise();
  }

  updateToDo(id: string): Promise<Task> {
    return this.httpClient.put<Task>(`${ environment.api.url }/tasks/${id}/todo`,{}).toPromise();
  }

  updateToDoing(id: string): Promise<Task> {
    return this.httpClient.put<Task>(`${ environment.api.url }/tasks/${id}/doing`,{}).toPromise();
  }

  updateToDone(id: string): Promise<Task> {
    return this.httpClient.put<Task>(`${ environment.api.url }/tasks/${id}/done`,{}).toPromise();
  }

  updateToArchived(id: string): Promise<Task> {
    return this.httpClient.put<Task>(`${ environment.api.url }/tasks/${id}/archived`,{}).toPromise();
  }

}
