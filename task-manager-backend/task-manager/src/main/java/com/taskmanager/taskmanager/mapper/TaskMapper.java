package com.taskmanager.taskmanager.mapper;

import com.taskmanager.taskmanager.dto.TaskDTO;
import com.taskmanager.taskmanager.model.Task;

public class TaskMapper {
	
    public static TaskDTO toDTO(Task task) {
        if (task == null) return null;

        TaskDTO dto = new TaskDTO();
        dto.setId(task.getId());
        dto.setTitulo(task.getTitulo());
        dto.setDescripcion(task.getDescripcion());
        dto.setEstado(task.getEstado());
        dto.setFechaCreacion(task.getFechaCreacion());
        dto.setFechaLimite(task.getFechaLimite());
        return dto;
    }

    public static Task toEntity(TaskDTO dto) {
        if (dto == null) return null;

        Task task = new Task();
        task.setId(dto.getId());
        task.setTitulo(dto.getTitulo());
        task.setDescripcion(dto.getDescripcion());
        task.setEstado(dto.getEstado());
        task.setFechaCreacion(dto.getFechaCreacion());
        task.setFechaLimite(dto.getFechaLimite());
        return task;
    }
}
