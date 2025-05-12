package com.taskmanager.taskmanager.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskmanager.taskmanager.dto.TaskDTO;
import com.taskmanager.taskmanager.mapper.TaskMapper;
import com.taskmanager.taskmanager.model.Task;
import com.taskmanager.taskmanager.repository.TaskRepository;

@Service
public class TaskService {
	
	@Autowired
    private TaskRepository taskRepository;
	

    // Obtener todas las tareas
    public List<TaskDTO> obtenerTareas() {
        return taskRepository.findAll()
                .stream()
                .map(TaskMapper::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener tarea por ID
    public Optional<TaskDTO> obtenerTareaPorId(Long id) {
        return taskRepository.findById(id).map(TaskMapper::toDTO);
    }

    // Crear o actualizar tarea
    public TaskDTO crearTarea(TaskDTO taskDTO) {
        Task tarea = TaskMapper.toEntity(taskDTO);
        Task tareaGuardada = taskRepository.save(tarea);
        return TaskMapper.toDTO(tareaGuardada);
    }
    
    public void eliminarTarea(Long id) {
        taskRepository.deleteById(id);
    }
}	
