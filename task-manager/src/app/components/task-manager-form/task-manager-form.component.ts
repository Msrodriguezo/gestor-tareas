import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TaskDTO } from '../../interfaces/task.interface';
import { TaskManagerServiceService } from '../../services/task-manager-service.service';

@Component({
  selector: 'app-task-manager-form',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-manager-form.component.html',
  styleUrls: ['./task-manager-form.component.scss'],
})
export class TaskManagerFormComponent implements OnInit {
  formData: TaskDTO = {
    titulo: '',
    descripcion: '',
    estado: 'PENDIENTE',
    fechaCreacion: '',
    fechaLimite: ''
  };

  statusOptions: TaskDTO['estado'][] = ['PENDIENTE', 'EN_PROGRESO', 'COMPLETADO'];
  isEditMode = false;
  minDate: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private taskService: TaskManagerServiceService
  ) {}

  ngOnInit(): void {
    this.calculateMinDate();
    const taskId = this.route.snapshot.paramMap.get('id');

    if (taskId) {
      this.isEditMode = true;
      this.taskService.getTaskById(Number(taskId)).subscribe({
        next: (task: TaskDTO) => {
          this.formData = {
            id: task.id,
            titulo: task.titulo,
            descripcion: task.descripcion,
            estado: task.estado,
            fechaCreacion: task.fechaCreacion || '',
            fechaLimite: task.fechaLimite || ''
          };
        },
        error: (err: any) => console.error('Error al cargar la tarea:', err)
      });
    } else {
      const today = new Date();
      this.formData.fechaCreacion = today.toISOString().split('T')[0]; // Solo la parte de la fecha (YYYY-MM-DD)
    }
  }

  calculateMinDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    this.minDate = `${year}-${month}-${day}`;
  }

  onSubmit() {
    const dto: TaskDTO = {
      titulo: this.formData.titulo,
      descripcion: this.formData.descripcion,
      estado: this.formData.estado,
      fechaCreacion: this.formData.fechaCreacion,
      fechaLimite: this.formData.fechaLimite
    };

    if (this.isEditMode && this.formData.id) {
      this.taskService.updateTask(this.formData.id, dto).subscribe({
        next: () => this.router.navigate(['/task-table']),
        error: (err: any) => console.error('Error al actualizar la tarea:', err)
      });
    } else {
      this.taskService.createTask(dto).subscribe({
        next: () => this.router.navigate(['/task-table']),
        error: (err: any) => console.error('Error al crear la tarea:', err)
      });
    }
  }

  onCancel() {
    this.router.navigate(['/task-table']);
  }

  resetForm() {
    this.formData = {
      titulo: '',
      descripcion: '',
      estado: 'PENDIENTE',
      fechaCreacion: '',
      fechaLimite: ''
    };
  }
}
