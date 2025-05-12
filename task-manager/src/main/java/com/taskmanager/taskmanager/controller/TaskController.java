package com.taskmanager.taskmanager.controller;

import com.taskmanager.taskmanager.dto.TaskDTO;
import com.taskmanager.taskmanager.service.TaskService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tasks")
@CrossOrigin
public class TaskController {

    @Autowired
    private TaskService taskService;

    // GET /tasks
    @GetMapping
    public ResponseEntity<List<TaskDTO>> obtenerTareas() {
        return ResponseEntity.ok(taskService.obtenerTareas());
    }

    // GET /tasks/{id}
    @GetMapping("/{id}")
    public ResponseEntity<TaskDTO> obtenerTareaPorId(@PathVariable Long id) {
        return taskService.obtenerTareaPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // POST /tasks
    @PostMapping
    public ResponseEntity<TaskDTO> crearTarea(@Valid @RequestBody TaskDTO taskDTO) {
        TaskDTO nuevaTarea = taskService.crearTarea(taskDTO);
        return ResponseEntity.ok(nuevaTarea);
    }

    // PUT /tasks/{id}
    @PutMapping("/{id}")
    public ResponseEntity<TaskDTO> actualizarTarea(@PathVariable Long id, @Valid @RequestBody TaskDTO taskDTO) {
        return taskService.obtenerTareaPorId(id)
                .map(tareaExistente -> {
                    taskDTO.setId(id);
                    TaskDTO actualizada = taskService.crearTarea(taskDTO);
                    return ResponseEntity.ok(actualizada);
                })
                .orElse(ResponseEntity.notFound().build());
    }

    // DELETE /tasks/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarTarea(@PathVariable Long id) {
        return taskService.obtenerTareaPorId(id)
                .map(t -> {
                    taskService.eliminarTarea(id);
                    return ResponseEntity.noContent().<Void>build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
