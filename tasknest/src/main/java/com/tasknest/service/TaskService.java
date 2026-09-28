package com.tasknest.service;

import com.tasknest.entity.Task;
import com.tasknest.entity.TaskList;
import com.tasknest.repository.TaskListRepository;
import com.tasknest.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskListRepository taskListRepository;

    private static final Set<String> VALID_PRIORITIES =
            Set.of("LOW", "MEDIUM", "HIGH");

    public TaskService(
            TaskRepository taskRepository,
            TaskListRepository taskListRepository) {

        this.taskRepository = taskRepository;
        this.taskListRepository = taskListRepository;
    }

    public Task createTask(Long taskListId, Task task) {

        TaskList taskList = taskListRepository.findById(taskListId)
                .orElseThrow(() ->
                        new RuntimeException("Task list not found"));

        if (task.getTitle() == null ||
                task.getTitle().trim().isEmpty()) {

            throw new RuntimeException("Task title is required");
        }

        if (task.getDueDate() == null) {
            throw new RuntimeException("Due date is required");
        }

        if (task.getDueDate().isBefore(LocalDate.now())) {
            throw new RuntimeException(
                    "Due date cannot be in the past");
        }

        if (task.getPriority() == null) {
            throw new RuntimeException("Priority is required");
        }

        String priority =
                task.getPriority().trim().toUpperCase();

        if (!VALID_PRIORITIES.contains(priority)) {
            throw new RuntimeException(
                    "Priority must be LOW, MEDIUM, or HIGH");
        }

        task.setPriority(priority);
        task.setTaskList(taskList);
        task.setCompleted(false);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Task getTaskById(Long id) {

        return taskRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Task not found"));
    }

    public Task updateCompletion(Long id, boolean completed) {

        Task task = getTaskById(id);

        task.setCompleted(completed);

        return taskRepository.save(task);
    }

    public List<Task> getTodayTasks() {

        return taskRepository.findByDueDate(LocalDate.now());
    }

    public List<Task> getOverdueTasks() {

        return taskRepository
                .findByDueDateBeforeAndCompletedFalse(
                        LocalDate.now()
                );
    }

    public Task moveTask(Long taskId, Long newTaskListId) {

        Task task = getTaskById(taskId);

        TaskList newList = taskListRepository
                .findById(newTaskListId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "Destination task list not found"));

        task.setTaskList(newList);

        return taskRepository.save(task);
    }

    public void deleteTask(Long id) {

        if (!taskRepository.existsById(id)) {
            throw new RuntimeException("Task not found");
        }

        taskRepository.deleteById(id);
    }
}