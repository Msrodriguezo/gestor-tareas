import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TaskDTO } from '../interfaces/task.interface';

@Injectable({
  providedIn: 'root'
})
export class TaskManagerServiceService {

  private apiUrl = 'http://localhost:8080/api/tasks';  // URL de tu backend en Spring Boot

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<TaskDTO[]> {
    return this.http.get<TaskDTO[]>(this.apiUrl);
  }

  getTaskById(id: number): Observable<TaskDTO> {
    return this.http.get<TaskDTO>(`${this.apiUrl}/${id}`);
  }

  createTask(task: TaskDTO): Observable<TaskDTO> {
    return this.http.post<TaskDTO>(this.apiUrl, task);
  }

  updateTask(id: number, task: TaskDTO): Observable<TaskDTO> {
    return this.http.put<TaskDTO>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
