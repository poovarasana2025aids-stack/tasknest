package com.tasknest.controller;

import com.tasknest.entity.TaskList;
import com.tasknest.service.TaskListService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/task-lists")
public class TaskListController {

    private final TaskListService taskListService;

    public TaskListController(TaskListService taskListService) {
        this.taskListService = taskListService;
    }

    // Create task list
    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public TaskList createTaskList(
            @RequestParam Long userId,
            @RequestParam String name) {

        return taskListService.createTaskList(userId, name);
    }

    // Get all task lists
    @GetMapping
    public List<TaskList> getAllTaskLists() {
        return taskListService.getAllTaskLists();
    }

    // Get task list by ID
    @GetMapping("/{id}")
    public TaskList getTaskListById(@PathVariable Long id) {
        return taskListService.getTaskListById(id);
    }

    // Delete task list
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteTaskList(@PathVariable Long id) {
        taskListService.deleteTaskList(id);
    }
}