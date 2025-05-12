import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskDTO } from '../../interfaces/task.interface';
import { TaskManagerServiceService } from '../../services/task-manager-service.service';

@Component({
  selector: 'app-task-table',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.scss'],
})
export class TaskTableComponent implements OnInit {
  tasks: TaskDTO[] = [];
  selectedTasks = new Set<number>();
  searchText: string = '';

  constructor(private router: Router, private taskService: TaskManagerServiceService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (tasks: TaskDTO[]) => {
        this.tasks = tasks;
      },
      error: (err) => console.error('Error al cargar tareas:', err),
    });
  }

  filteredTasks(): TaskDTO[] {
    if (!this.searchText.trim()) {
      return this.tasks;
    }
    const lowerSearch = this.searchText.toLowerCase();
    return this.tasks.filter(t => t.titulo.toLowerCase().includes(lowerSearch));
  }

  isOverdue(date?: string): boolean {
    if (!date) return false;
    const taskDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return taskDate.getTime() < today.getTime();
  }

  toggleTaskSelection(taskId?: number) {
    if (taskId === undefined) return;
    if (this.selectedTasks.has(taskId)) {
      this.selectedTasks.delete(taskId);
    } else {
      this.selectedTasks.add(taskId);
    }
  }

  deleteSelectedTasks() {
    const deleteRequests = Array.from(this.selectedTasks).map(id =>
      this.taskService.deleteTask(id)
    );

    Promise.all(deleteRequests.map(obs => obs.toPromise()))
      .then(() => {
        this.selectedTasks.clear();
        this.loadTasks();
      })
      .catch(err => console.error('Error al eliminar tareas:', err));
  }

  getActionButtonText(): string {
    return this.selectedTasks.size === 1 ? 'Editar Tarea' : 'Crear Tarea';
  }

  isActionButtonDisabled(): boolean {
    return this.selectedTasks.size > 1;
  }

  handleActionButtonClick() {
    if (this.selectedTasks.size === 1) {
      const id = Array.from(this.selectedTasks)[0];
      this.router.navigate(['/task-form', id]);
    } else {
      this.router.navigate(['/task-form']);
    }
  }
}
