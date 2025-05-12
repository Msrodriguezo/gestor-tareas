package com.taskmanager.taskmanager.dto;

import lombok.Data;

import java.time.LocalDate;

import com.taskmanager.taskmanager.model.TaskStatus;

@Data
public class TaskDTO {
	
    private Long id;
    private String titulo;
    private String descripcion;
    private TaskStatus estado;
    private LocalDate fechaCreacion;
    private LocalDate fechaLimite;
    
}
