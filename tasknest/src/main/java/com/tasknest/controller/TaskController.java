package com.tasknest.controller;
import jakarta.validation.Valid;
import com.tasknest.entity.Task;
import com.tasknest.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Create task
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Task createTask(
            @RequestParam Long taskListId,
            @Valid @RequestBody Task task) {

        return taskService.createTask(taskListId, task);
    }

    // Get all tasks
    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

    // Get task by ID
    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
        return taskService.getTaskById(id);
    }

    // Mark complete/incomplete
    @PutMapping("/{id}/complete")
    public Task updateCompletion(
            @PathVariable Long id,
            @RequestParam boolean completed) {

        return taskService.updateCompletion(id, completed);
    }

    // Today's tasks
    @GetMapping("/today")
    public List<Task> getTodayTasks() {
        return taskService.getTodayTasks();
    }

    // Overdue tasks
    @GetMapping("/overdue")
    public List<Task> getOverdueTasks() {
        return taskService.getOverdueTasks();
    }

    // Move task
    @PutMapping("/{taskId}/move")
    public Task moveTask(
            @PathVariable Long taskId,
            @RequestParam Long newTaskListId) {

        return taskService.moveTask(taskId, newTaskListId);
    }

    // Delete task
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTask(@PathVariable Long id) {
        taskService.deleteTask(id);
    }
}