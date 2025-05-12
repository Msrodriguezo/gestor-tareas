
export interface TaskDTO {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADO';
  fechaCreacion?: string;
  fechaLimite?: string;
}
